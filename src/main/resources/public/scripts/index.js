const telas = {
    home: `
    <div id="home-dashboard">
          <article class="container">
            <h3 class="container-tittle">Média do Campus<small class="low-opacity-text">Atualizado há 30 segundos</small></h3 class="container-tittle">

            <dd><output class="reading" id="average-temperature">26,1°C</output> <span class="low-opacity-text">Tempo Limpo</span></dd>
            
            <hr>

            <dl class="metric-grid">
            <div class="reading-card">
              <dt class="low-opacity-text">Umidade Média</dt>
              <dd><output class="reading" id="average-humidity">90%</output></dd>
            </div>

            <div class="reading-card">
              <dt class="low-opacity-text">Pressão Média</dt>
              <dd><output class="reading" id="avarage-pressure">922,73 hPa</output></dd>
            </div>
            </dl>

          </article>
          <article class="container">
            <h3 class="container-tittle">Outros Parâmetros Ambientais</h3 class="container-tittle">
            <dl class="metric-grid">

            <div class="reading-card">
              <dt class="low-opacity-text">Luminosidade</dt>
              <dd><output class="reading" id="luminosity-reading">72%</output></dd>
            </div>

            <div class="reading-card">
              <dt class="low-opacity-text">Vel. Vento</dt>
              <dd><output class="reading" id="wind-speed-reading">3,3 m/s</output></dd>
            </div>

            <div class="reading-card">
              <dt class="low-opacity-text">Dir. Vento</dt>
              <dd><output class="reading" id="wind-direction-reading">Sul (179°)</output></dd>
            </div>

            <div class="reading-card">
              <dt class="low-opacity-text">Altitude</dt>
              <dd><output class="reading" id="altitude-reading">781 m</output></dd>
            </div>

            </dl>
            <canvas></canvas>
          </article>
          <article class="container">
            <h3 class="container-tittle">Monitoramento por Área</h3 class="container-tittle">
            <dt class="low-opacity-text"></dt>
              Navegue pelos sensores individuais do campus.
            </dt>
            <button></button><button></button>
            <div class="reading-card">
              <span>Gateway</span>
              <dd><output class="reading" id="gateway-location">Sensor Refeitorio</output></dd>
              <dt class="low-opacity-text">Status do Atuador</dt>
              <dd><output class="reading" id="actuator-status">Ligado</output></dd>
              <div>
                <dt class="low-opacity-text">Temperatura</dt>
                <dd><output class="reading" id="gateway-temperature"></output></dd>
                <dt class="low-opacity-text">Umidade</dt>
                <dd><output class="reading" id="gateway-humidity"></output></dd>
                <dt class="low-opacity-text">Luminosidade</dt>
                <dd><output class="reading" id="gateway-luminosity"></output></dd>
                <dt class="low-opacity-text">Pressão</dt>
                <dd><output class="reading" id="gateway-pressure"></output></dd>
                <dt class="low-opacity-text">Altitude</dt>
                <dd><output class="reading" id="gateway-altitude"></output></dd>
                <dt class="low-opacity-text">Velocidade do Vento</dt>
                <dd><output class="reading" id="gateway-wind-speed"></output></dd>
              </div>
            </div>
          </article>
        </div>
        `,
        historico: `
        `,
        mapa: `
        `,
        sobre: `
        `,
        robo: `
        `

}

function mudarTela(nomeTela) {
    const mainContainer = document.querySelector('.content-panel')

    if (telas[nomeTela]) {
        mainContainer.innerHTML = telas[nomeTela]
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mudarTela('home');
});