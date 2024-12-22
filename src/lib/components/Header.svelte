<!-- src/lib/components/Header.svelte -->

<script>
  import Button from "./Button.svelte";
  export let activeSection; // Получаем текущее активное состояние
  export let setActiveSection; // Функция для смены активного раздела
</script>

<div class="container-header">
  <div class="first-container">
    <h1>Pavel Sharagulov</h1>
    <p>Frontend Developer & Designer</p>
  </div>
  <div class="second-container">
    <Button
      active={activeSection === "Me"}
      on:click={() => setActiveSection("Me")}
    >
      Me
    </Button>
    <Button
      active={activeSection === "Projects"}
      on:click={() => setActiveSection("Projects")}
    >
      Projects
    </Button>
    <Button
      active={activeSection === "This"}
      on:click={() => setActiveSection("This")}
    >
      This
    </Button>
  </div>
</div>

<style>
  .container-header {
    z-index: 100;
    padding: 50px;
    height: fit-content;
    flex-shrink: 0; /* Предотвращаем сжатие */
    display: flex;
    justify-content: space-between;
    gap: 50px;
    background-color: black;
    align-items: center;
  }

  .first-container {
    height: fit-content;
  }

  .second-container {
    height: fit-content;
    display: flex;
    flex-direction: row;
    gap: 10vw;
  }
</style>
