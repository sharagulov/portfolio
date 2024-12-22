<!-- src/lib/Shaders.svelte -->

<script>
  import { onMount } from "svelte";
  import * as THREE from "three";

  let canvas;

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;

    // Инициализация рендерера
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Обработка изменения размера окна
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Создание геометрии точек
    const numPoints = 5000;
    const positions = new Float32Array(numPoints * 3);
    const phases = new Float32Array(numPoints); // Фазы для мерцания
    const frequencies = new Float32Array(numPoints); // Частоты для мерцания

    for (let i = 0; i < numPoints; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      phases[i] = Math.random() * Math.PI * 2; // Случайная фаза от 0 до 2π
      frequencies[i] = 0.5 + Math.random(); // Частота от 0.5 до 2.0
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("a_phase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute(
      "a_frequency",
      new THREE.BufferAttribute(frequencies, 1)
    );

    // Определение шейдеров
    const vertexShader = `
          attribute float a_phase;
          attribute float a_frequency;
          varying float v_phase;
          varying float v_frequency;
          void main() {
              v_phase = a_phase;
              v_frequency = a_frequency;
              gl_PointSize = 2.0;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
      `;

    const fragmentShader = `
          uniform float u_time;
          varying float v_phase;
          varying float v_frequency;

          void main() {
              float dist = distance(gl_PointCoord, vec2(0.5));
              float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
              
              // Мерцание: использование индивидуальной фазы и частоты для каждой точки
              float brightness = 0.7 + 0.3 * sin(u_time * v_frequency + v_phase);
              
              // Добавление небольших случайных отклонений для более естественного эффекта
              brightness += 0.05 * sin(u_time * v_frequency * 2.0 + v_phase * 1.5);
              brightness = clamp(brightness, 0.6, 1.0);
              
              // Небольшие цветовые отклонения для каждого канала
              float colorVariationR = 0.1 * sin(u_time * v_frequency + v_phase * 3.0);
              float colorVariationG = 0.05 * sin(u_time * v_frequency + v_phase * 2.0 + 1.0);
              float colorVariationB = 0.07 * sin(u_time * v_frequency + v_phase * 4.0 + 2.0);
              
              vec3 color = vec3(
                  clamp(brightness + colorVariationR, 0.0, 1.0),
                  clamp(brightness + colorVariationG, 0.0, 1.0),
                  clamp(brightness + colorVariationB, 0.0, 1.0)
              );
              
              gl_FragColor = vec4(color, alpha);
          }
      `;

    // Создание материала с шейдерами
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
      },
      transparent: true,
    });

    // Создание точки системы
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Анимация
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      // Замедление вращения
      points.rotation.x -= 0.00002;
      points.rotation.y -= 0.00005;
      renderer.render(scene, camera);
    };

    animate();

    // Очистка при уничтожении компонента
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  });
  
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
  }
</style>
