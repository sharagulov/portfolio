<!-- src/lib/components/MeSection.svelte -->

<script></script>

<div class="me-section section">
  <div class="me-flex-container">
    <div class="me-text-flex-container">
      <h3>Фронтенд</h3>
      <p>
        Фронтенд на протяжении нескольких лет притягивает меня своей эластичностью и гибкостью. Он дает возможность скрытым талантам проявиться, а знакомым — подтвердить свою силу. 
      </p>
    </div>
    <div class="me-text-flex-container">
      <h3>Что я такое?</h3>
      <p>
        Еще в школе я заинтересовался HTML/CSS и стал двигаться дальше в этом направлении: узнал о JavaScript, выучил и полюбил его. После с уверенностью пошел в сферу фронтенда, начал эксперименты с библиотекой React и познакомился с Vue, Svelte и Next. 
      </p>
    </div>
    <div class="me-text-flex-container">
      <h3>Еще навыки?</h3>
      <p>
        Стараясь получать многостороннее развитие, начал самостоятельно ставить себе задачи и выполнять их. Пока не нашел команду, вел разработку в одиночку: от прототипа в Figma/Photoshop через вёрстку до итогового тестирования продукта, выявления и исправления косяков.
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

  @media (max-width: 1370px) {
    .me-flex-container {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }
</style>
