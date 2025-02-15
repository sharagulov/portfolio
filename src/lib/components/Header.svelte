<!-- src/lib/components/Header.svelte -->

<script>
  import DropdownMenu from "./DropdownMenu.svelte";
  import Button from "./Button.svelte";
  import Burger from "../../assets/icons/burger.png";
  export let activeSection; // Получаем текущее активное состояние
  export let setActiveSection; // Функция для смены активного раздела
</script>

<div class="container-header">
  <div class="first-container">
    <h1>Pavel Sharagulov</h1>
    <p>frontend developer & designer</p>
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
  <div class="burger-container">
    <DropdownMenu onToggle={(isOpen) => console.log("Меню открыто:", isOpen)}>
      <img src={Burger} alt="burger button" slot="trigger" />
      <div class="menu-buttons">
        <Button
          variant="-menu"
          active={activeSection === "Me"}
          on:click={() => setActiveSection("Me")}
        >
          Me
        </Button>
        <Button
          variant="-menu"
          active={activeSection === "Projects"}
          on:click={() => setActiveSection("Projects")}
        >
          Projects
        </Button>
        <Button
          variant="-menu"
          active={activeSection === "This"}
          on:click={() => setActiveSection("This")}
        >
          This
        </Button>
      </div>
    </DropdownMenu>
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

  .burger-container {
    display: none;
    width: 25px;
    height: 100%;
    align-content: start;
  }

  .menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  @media (max-width: 1000px) {
    .second-container {
      display: none;
    }
    .burger-container {
      display: inline-block;
    }
    .container-header {
      padding: 25px;
    }
  }
</style>
