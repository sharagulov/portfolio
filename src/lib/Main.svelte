<!-- src/lib/Main.svelte -->
<script>
  import Header from "./components/Header.svelte";
  import ProjectsSection from "./components/ProjectSection.svelte";
  import MeSection from "./components/MeSection.svelte";
  import { gsap } from "gsap";
  import Loading from "./Loading.svelte";
  import Shaders from "./Shaders.svelte";

  let activeSection = "Projects";

  // Чёрный оверлей для переходов между секциями
  let transitionOverlay, loadInstance;

  function setActiveSection(section) {
    if (section === activeSection) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        activeSection = section;
        gsap.to(transitionOverlay, {
          autoAlpha: 0,
          duration: 0.2,
          zIndex: -9999
        });
        gsap.to(".container-main", {
          scale: 1,
        });
      },
    });
    // Показать оверлей
    loadInstance.restartAnimation();
    timeline
      .to(transitionOverlay, {
        autoAlpha: 1,
        duration: 0.2,
        zIndex: 9999,
      })
      .to(
        ".container-main",
        {
          scale: 1.1,
        },
        "<"
      )
      .to({}, { duration: 1 });
  }

  /** @type {Record<string, { default: string }>} */
  const images = import.meta.glob("../assets/img/*.png", { eager: true });

  let projectImages = Object.entries(images).map(([path, mod]) => {
    const fileName = path.split("/").pop().replace(".png", "");
    return {
      src: mod.default,
      title: `Project: ${fileName}`,
      desc: `This is a description of the project: ${fileName}. You can provide any details here.`,
    };
  });

  projectImages.sort(() => 0.5 - Math.random());
</script>

<div class="main-wrapper">
  <div class="transition-overlay" bind:this={transitionOverlay}>
    <Loading bind:this={loadInstance} />
  </div>

  <Header {activeSection} {setActiveSection} />

  <div class="container-main">
    <div class="background">
      <Shaders />
    </div>
    {#if activeSection === "Me"}
      <MeSection />
    {/if}
    {#if activeSection === "Projects"}
      <ProjectsSection images={projectImages} />
    {/if}
    {#if activeSection === "This"}
      <div class="section">This is the 'This' section.</div>
    {/if}
  </div>
</div>

<style>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;
    width: 100vw;
  }

  .transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }

  .container-main {
    position: relative;
    z-index: 0;
    height: 100%;
    color: white;
  }

  .section {
    height: 100%;
  }
</style>
