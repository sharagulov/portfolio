<script>
  import * as THREE from "three";
  import { onMount } from "svelte";

  let container;
  let renderer, scene, camera;
  let animationId;

  onMount(() => {
    initScene();
    initParticles();
    animate();

    // Очистка рендера при размонтировании компонента
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  });

  function initScene() {
    // Инициализация рендера
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Создаём сцену и камеру
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Можно добавить освещение, если нужно
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);

    // Отслеживание изменений размера окна
    window.addEventListener("resize", onWindowResize, false);
  }

  function initParticles() {
    // Пример на базе PointsMaterial

    // 1. Создаем геометрию (например, сферу)
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // 2. Превращаем в набор точек (Points)
    // Здесь используем обычный материал - PointsMaterial
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      // sizeAttenuation: true, // обычно по умолчанию
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    // Пример примитивной анимации: вращаем нашу «форму»
    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
</script>

<div bind:this={container} class="background-canvas"></div>

<style>
  :global(.background-canvas) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none; /* чтобы фон не перехватывал клики */
    z-index: -1; /* располагаем под остальным контентом */
  }
</style>
