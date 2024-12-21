<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { throttle } from "lodash";

  let centerImageInterval;
  let autoScrollTween;
  let startTimeout;
  let inactivityTimer;

  let carousel;
  let items;
  let projects;
  let verticalLine;
  let lineTextEl;

  export let images = [];
  let itemsRect = [];

  let infiniteImages = [...images, ...images];

  let centerX = window.innerWidth / 4;

  let resizeHandler = () => {
    if (verticalLine) {
      centerX = window.innerWidth / 4;
      verticalLine.style.left = centerX + "px";
      lineTextEl.style.left = centerX + 10 + "px";
      throttledFindUnderlineImage(centerX);
    }
  };

  function handleMouseEnter() {
    deleteCenterImage();
    clearInterval(centerImageInterval);
    verticalLine.style.transition = "none";
    lineTextEl.style.transition = "none";
    findCoordinates();

    clearTimeout(inactivityTimer);

    if (autoScrollTween) {
      autoScrollTween.kill();
      autoScrollTween = null;
    }
  }

  function handleMouseLeave() {
    verticalLine.style.transition = "all 0.3s";
    lineTextEl.style.transition = "all 0.3s";
    verticalLine.style.left = centerX + "px";
    lineTextEl.style.left = centerX + 10 + "px";
    throttledFindUnderlineImage(centerX);
    centerImageInterval = setInterval(() => {
      throttledFindUnderlineImage(centerX);
    }, 300);

    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      startAutoScroll();
    }, 8000);
  }

  function startAutoScroll() {
    if (!carousel) return;

    autoScrollTween = gsap.to(carousel, {
      scrollLeft: "+=20000",
      duration: 800,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        const maxScroll = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollLeft -= maxScroll;
        }
      },
    });
  }

  function findCoordinates() {
    itemsRect = Array.from(items).map((item) => {
      const rect = item.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      };
    });
  }

  const throttledFindUnderlineImage = throttle((xPosition) => {
    findUnderlineImage(xPosition);
  }, 100); // каждые 100 мс

  function findUnderlineImage(xPosition) {
    const originalLength = images.length;
    let activeIndex = null;

    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect();
      if (xPosition >= rect.left && xPosition <= rect.right) {
        activeIndex = i;
        break;
      }
    }

    items.forEach((item) => item.classList.remove("activate"));

    if (activeIndex !== null) {
      let pairIndex;
      if (activeIndex < originalLength) {
        pairIndex = activeIndex + originalLength;
      } else {
        pairIndex = activeIndex - originalLength;
      }

      items[activeIndex].classList.add("activate");
      items[pairIndex].classList.add("activate");

      lineTextEl.textContent = infiniteImages[activeIndex]?.title;
    }
  }
  function deleteCenterImage() {
    items.forEach((item) => {
      item.classList.remove("activate");
    });
  }

  function handleMouseMove(event) {
    const mouseX = event.clientX;
    verticalLine.style.left = mouseX + "px";
    lineTextEl.style.left = mouseX + 10 + "px";
    throttledFindUnderlineImage(mouseX);
  }

  function handleScroll(event) {
    const mouseX = event.clientX;

    event.preventDefault();
    const maxScroll = carousel.scrollWidth / 2;

    gsap.to(carousel, {
      scrollLeft: carousel.scrollLeft + event.deltaY * 5,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        throttledFindUnderlineImage(mouseX);
        items.forEach((item) => item.classList.remove("activate"));
        if (carousel.scrollLeft >= maxScroll) {
          carousel.scrollLeft -= maxScroll;
        } else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += maxScroll;
        }
      },
      onComplete: () => {
        throttledFindUnderlineImage(centerX);
      },
    });
  }

  onMount(() => {
    items = carousel.querySelectorAll(".carousel-item img");
    window.addEventListener("resize", resizeHandler);
    handleMouseEnter();
    handleMouseLeave();
    projects.style.transition = "all 3s";
    setTimeout(() => {
      projects.style.transition = "none";
    }, 4000);
    setTimeout(() => {
      projects.style.opacity = "1";
    }, 1000);

    setTimeout(() => {
      if (carousel) {
        startAutoScroll();
      }
    }, 4000);
  });

  onDestroy(() => {
    window.removeEventListener("resize", resizeHandler);
    clearInterval(centerImageInterval);
    if (autoScrollTween) {
      autoScrollTween.kill();
      autoScrollTween = null;
    }
  });
</script>

<div
  class="projects-container"
  on:wheel={handleScroll}
  on:mousemove={handleMouseMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="none"
  bind:this={projects}
>
  <div class="carousel" bind:this={carousel}>
    {#each infiniteImages as image, index (index)}
      <div class="carousel-item">
        <img src={image.src} alt={`Project ${index + 1}`} loading="lazy" />
        <p class="small-text">X: {itemsRect[index]?.left}</p>
        <p class="small-text">PRCSN: {itemsRect[index]?.right - 2000}</p>
      </div>
    {/each}
  </div>

  <div class="vertical-line" bind:this={verticalLine}></div>
  <div class="line-text" bind:this={lineTextEl}></div>
</div>

<style>
  .projects-container {
    opacity: 0;
    position: relative;
    display: flex;
    align-items: end;
    height: 100%;
    overflow: hidden;
  }

  .carousel {
    display: flex;
    overflow-x: hidden;
    height: 100%;
    align-items: end;
    z-index: 10;
  }

  .carousel-item {
    padding-bottom: 50px;
    align-content: end;
    flex: 0 0 auto;
    height: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .carousel-item img {
    max-width: 600px;
    max-height: 400px;
    object-fit: contain;
    filter: brightness(0.25) saturate(0);
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    z-index: 10;
  }

  .carousel-item:hover img,
  :global(.carousel-item img.activate) {
    filter: brightness(1) saturate(1);
  }

  .vertical-line {
    position: absolute;
    top: 0;
    width: 2px;
    height: 80%;
    background: white;
    pointer-events: none;
    z-index: 5;
  }

  .line-text {
    top: 0;
    position: absolute;
    pointer-events: none;
    font-size: 30px;
    line-height: 1;
  }

  .small-text {
    font-size: 10px;
  }
</style>
