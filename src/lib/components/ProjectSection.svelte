<!-- src/lib/components/ProjectSection.svelte -->

<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { selectedTitle } from "../../stores/selectedTitle";

  let centerImageInterval;
  let autoScrollTween;
  let inactivityTimer;

  let carousel, carouselImage;
  let items;
  let projects;
  let verticalLine;
  let lineTextEl;

  let touchStartX = 0;
  let scrollStartX = 0;
  let currentNameMobile;

  export let images = [];
  let itemsRect = [];

  let infiniteImages = [...images, ...images];

  let centerX = window.innerWidth / 4;

  let resizeHandler = () => {
    if (verticalLine) {
      centerX = window.innerWidth / 4;
      verticalLine.style.left = centerX + "px";
      lineTextEl.style.left = centerX + 10 + "px";
      findUnderlineImage(centerX);
    }
  };

  // <-- МОБИЛКА -->

  function checkScreenSize() {
    if (window.innerWidth <= 1000) return 1;
    else return 0;
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    scrollStartX = carousel.scrollLeft;
  }

  function handleTouchMove(event) {
    const touchX = event.touches[0].clientX;
    const deltaX = touchStartX - touchX;
    carousel.scrollLeft = scrollStartX + deltaX;
  }

  // <-- КОНЕЦ МОБИЛКИ -->

  function handleMouseEnter() {
    if (checkScreenSize()) return;

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
    if (checkScreenSize()) return;

    verticalLine.style.transition = "all 0.3s";
    lineTextEl.style.transition = "all 0.3s";
    verticalLine.style.left = centerX + "px";
    lineTextEl.style.left = centerX + 10 + "px";
    findUnderlineImage(centerX);
    centerImageInterval = setInterval(() => {
      findUnderlineImage(centerX);
    }, 300);

    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      startAutoScroll();
    }, 8000);
  }

  function startAutoScroll() {
    if (!carousel) return;

    autoScrollTween = gsap.to(carousel, {
      scrollLeft: "+=200000000",
      duration: 8000000,
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

  function handleImgHover(title, index) {
    selectedTitle.set(title); // Обновляем store с новым заголовком
    currentNameMobile = title;
    lineTextEl.textContent = title;

    const originalLength = images.length;
    let activeIndex = index,
      pairIndex;
    if (activeIndex < originalLength) {
      pairIndex = activeIndex + originalLength;
    } else {
      pairIndex = activeIndex - originalLength;
    }
    items[pairIndex].classList.add("activate");
  }
  function handleImgLeave(index) {
    const originalLength = images.length;
    let activeIndex = index,
      pairIndex;
    if (activeIndex < originalLength) {
      pairIndex = activeIndex + originalLength;
    } else {
      pairIndex = activeIndex - originalLength;
    }
    items[pairIndex].classList.remove("activate");
  }

  function handleMouseMove(event) {
    if (checkScreenSize()) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    verticalLine.style.left = mouseX + "px";
    lineTextEl.style.left = mouseX + 10 + "px";
    lineTextEl.style.height = mouseY - 157 + "px";
  }

  function handleScroll(event) {
    if (checkScreenSize()) return;

    clearTimeout(inactivityTimer);

    event.preventDefault();
    const maxScroll = carousel.scrollWidth / 2;

    gsap.to(carousel, {
      scrollLeft: carousel.scrollLeft + event.deltaY * 7,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (carouselImage.style)
          if (carousel.scrollLeft >= maxScroll) {
            carousel.scrollLeft -= maxScroll;
          } else if (carousel.scrollLeft <= 0) {
            carousel.scrollLeft += maxScroll;
          }
      },
      onComplete: () => {},
    });
  }

  onMount(() => {
    items = carousel.querySelectorAll(".carousel-item img");
    window.addEventListener("resize", resizeHandler);
    handleMouseEnter();
    handleMouseLeave();
    handleImgHover(images[0].title, 0);
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
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  role="none"
  bind:this={projects}
>
  <div class="carousel" bind:this={carousel}>
    {#if currentNameMobile}
      <div class="mobile-title">{currentNameMobile}</div>
    {/if}
    {#each infiniteImages as image, index (index)}
      <div
        class="carousel-item"
        on:mouseenter={() => handleImgHover(image.title, index)}
        on:mouseleave={() => handleImgLeave(index)}
        role="none"
      >
        <img
          src={image.src}
          alt={`Project ${index + 1}`}
          loading="lazy"
          bind:this={carouselImage}
        />
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
    position: relative;
    display: flex;
    align-items: end;
    height: 100%;
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
    z-index: 10;
    user-select: none;
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
    align-content: end;
    max-height: 570px;
    font-family: novoposelensky;
  }

  .mobile-title {
    font-family: novoposelensky;
    position: fixed;
    top: 200px;
    justify-content: center;
    z-index: 500;
    width: 100%;
    display: none;
  }

  .small-text {
    font-size: 10px;
    opacity: 0.5;
  }

  @media (max-height: 800px) {
    .carousel-item img {
      max-height: 40vh;
    }
    .small-text {
      font-size: 1vh;
    }
  }

  @media (max-width: 1000px) {
    .carousel-item {
      padding-bottom: 100px;
      height: 90svh;
    }
    .vertical-line,
    .line-text {
      display: none;
    }
    .mobile-title {
      display: flex;
    }
    .carousel-item img {
      filter: brightness(1) saturate(1);
      max-width: 300px;
      max-height: 200px;
    }
  }
</style>
