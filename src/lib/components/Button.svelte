<script>
  export let active = false;
  export let variant = "";
</script>

<div class="container">
  <button class={`main-container${variant} ${active ? "active" : ""}`} on:click>
    <slot class="inner-text"></slot>
  </button>
  {#if variant == ""}
    <div class="xy {active ? 'active' : ''}">PXSHXBLX</div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    display: inline;
    width: fit-content;
  }

  .xy {
    color: transparent;
    font-size: 10px;
  }

  .xy.active {
    color: white;
  }

  .main-container {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    color: rgb(221, 221, 221);
    transition:
      color 0.1s,
      background-color 0.1s;
    border: 0.1px solid;
    border-color: transparent;
    padding: 5px 15px;
  }

  .main-container:hover {
    color: white;
    cursor: pointer;
    border-color: white;
  }

  .main-container-menu {
    display: inline;
    width: fit-content;
    height: 100%;
    background-color: transparent;
    color: rgb(221, 221, 221);
    border: 0.1px solid;
    border-color: transparent;
    padding: 8px;
  }

  .active {
    border-color: white;
  }

  button {
    height: 100%;
  }
</style>
