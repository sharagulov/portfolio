<!-- src/lib/components/MeSection.svelte -->

<script></script>

<div class="me-section section">
  <div class="me-flex-container">
    <div class="me-text-flex-container">
      <h3>Lorem, ipsum.</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam,
        sit quisquam! Eos aspernatur animi nostrum corporis consequuntur magnam
        in fuga porro impedit ab ipsam perferendis dolorum amet vel
      </p>
    </div>
    <div class="me-text-flex-container">
      <h3>Lorem, ipsum.</h3>
      <p>
        Quam incidunt ipsum, ullam praesentium culpa totam quidem. Nobis
        accusamus incidunt nostrum architecto recusandae neque, nesciunt ipsa
        minus, at cum, harum animi. Cupiditate, debitis magni sequi delectus
        aliquid sint illum quo maxime, modi temporibus cumque rerum obcaecati.
        Officia necessitatibus eos officiis voluptates quis velit asperiores
        unde possimus
      </p>
    </div>
    <div class="me-text-flex-container">
      <h3>Lorem, ipsum.</h3>
      <p>
        Iure repudiandae ullam, aliquam earum impedit esse veritatis adipisci
        voluptate optio soluta laborum modi sequi! Enim nulla quam, minus natus
        neque sunt adipisci cum.
      </p>
    </div>
  </div>
</div>

<style>
  .me-section {
    padding: 10vh 6vw;
    align-content: center;
    height: 100%;

    .me-flex-container {
      display: flex;
      justify-content: space-between;

      .me-text-flex-container {
        max-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }

  @media (max-width: 700px) {
    .me-flex-container {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }
</style>
