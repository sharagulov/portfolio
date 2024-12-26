<script>
  import { onClickOutside } from "./onClickOutside.js";

  export let isOpen = false; // Состояние меню
  export let onToggle = (isOpen) => {}; // Коллбэк для отслеживания состояния

  function toggleDropdown() {
    isOpen = !isOpen;
    onToggle(isOpen);
  }
</script>

<div class="dropdown-container" use:onClickOutside={() => (isOpen = false)}>
  <div class="dropdown-trigger" role="none" on:click={toggleDropdown}>
    <slot name="trigger" />
  </div>
  {#if isOpen}
    <div class="dropdown-menu">
      <slot />
    </div>
  {/if}
</div>

<style>
  .dropdown-container {
    position: relative;
  }

  .dropdown-trigger {
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    background-color: black;
    border: 1px solid grey;
    z-index: 100;
    border-radius: 5px;
    padding: 10px;
    min-width: fit-content;
  }
</style>
