<script>
  import Header from "./components/Header.svelte";
  import ProjectsSection from "./components/ProjectSection.svelte";
  import MeSection from "./components/MeSection.svelte";
  import { onMount } from "svelte";

  let activeSection = "Projects";

  function setActiveSection(section) {
    activeSection = section;
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

<main class="main-container">
  <div class="container-header">
    <Header {activeSection} {setActiveSection} />
  </div>

  <div class="container-main">
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
</main>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
  }

  .container-header {
    width: 100%;
    height: fit-content;
  }

  .container-main {
    flex-grow: 1;
    height: 100%;
    color: white;
  }

  .section {
    height: 100%;
  }
</style>
