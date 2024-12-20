<script>
  import "../styles/fonts.css";
  import loadingSvg from "../public/ripples.svg";
</script>

<div class="global-container">
  <div class="container grey-color">
    <img src={loadingSvg} alt="Loading SVG" />
  </div>
</div>

<style>
  .global-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .container {
    padding: 10px;
    border-radius: 10px;
  }

  img {
    width: 30px;
    height: 30px;
  }
</style>
