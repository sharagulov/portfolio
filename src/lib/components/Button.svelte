<script>
  export let active = false;
</script>

<div class="container">
  <button class="main-container {active ? 'active' : ''}" on:click>
    <slot></slot>
  </button>
  <div class="xy {active ? 'active' : ''}">X: 6.15 Y: 32.31</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .xy {
    color: transparent;
    font-size: 5px;
  }

  .xy.active {
    color: white;
  }

  .main-container {
    font-weight: bold;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    color: rgb(221, 221, 221);
    transition:
      color 0.1s,
      background-color 0.1s;
    border: 0.1px solid;
    border-color: transparent;
  }

  .main-container.active {
    border-color: white;
  }

  .main-container:hover {
    color: white;
    cursor: pointer;
    border-color: white;
  }

  button {
    height: 100%;
    padding: 5px 15px;
  }
</style>
