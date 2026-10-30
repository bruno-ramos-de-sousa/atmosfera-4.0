const screens = {
  home: `
    <div id="home-dashboard">
      <article class="container">
        <h3 class="container-tittle">Média do Campus<small class="low-opacity-text">Atualizado há 30 segundos</small></h3 class="container-tittle">

        <dd><output class="reading" id="average-temperature"></output> <span class="low-opacity-text">Tempo Limpo</span></dd>
        
        <hr>

        <dl class="metric-grid">
        <div class="reading-card">
          <dt class="low-opacity-text">Umidade Média</dt>
          <dd><output class="reading" id="average-humidity"></output></dd>
        </div>

        <div class="reading-card">
          <dt class="low-opacity-text">Pressão Média</dt>
          <dd><output class="reading" id="avarage-pressure"></output></dd>
        </div>
        </dl>

      </article>
      <article class="container">
        <h3 class="container-tittle">Outros Parâmetros Ambientais</h3 class="container-tittle">
        <dl class="metric-grid">

        <div class="reading-card">
          <dt class="low-opacity-text">Luminosidade</dt>
          <dd><output class="reading" id="luminosity-reading"></output></dd>
        </div>

        <div class="reading-card">
          <dt class="low-opacity-text">Vel. Vento</dt>
          <dd><output class="reading" id="wind-speed-reading"></output></dd>
        </div>

        <div class="reading-card">
          <dt class="low-opacity-text">Dir. Vento</dt>
          <dd><output class="reading" id="wind-direction-reading"></output></dd>
        </div>

        <div class="reading-card">
          <dt class="low-opacity-text">Altitude</dt>
          <dd><output class="reading" id="altitude-reading"></output></dd>
        </div>
        </dl>

        <canvas id="temperature-graph"></canvas>
      </article>
      <article class="container">
        <div>
          <div>
            <h3 class="container-tittle">Monitoramento por Área</h3 class="container-tittle">
            <dt class="low-opacity-text">Navegue pelos sensores individuais do campus.</dt>
          </div>
          <div id="corrosel-dis">
            <p class="container">Area 1 de 3</p>
            <button class="container" id="btn-prev"><span></span><span></span></button>
            <button class="container" id="btn-next"><span></span><span></span></button>
          </div>
        </div>

        <div class="reading-card">

          <div>
            <span id="device-type"> <span></span>Gateway</span>

            <dd><output class="reading" id="gateway-location">Sensor Refeitorio</output></dd>
            <dt class="low-opacity-text">Status do Atuador (Led 1):</dt>

            <dd><output class="reading" id="actuator-status"><span></span>Ligado</output></dd>
          </div>
          
          <div class="metric-grid container">

            <div>
              <dt class="low-opacity-text">Temperatura</dt>
              <dd><output class="reading" id="gateway-temperature"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Umidade</dt>
              <dd><output class="reading" id="gateway-humidity"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Luminosidade</dt>
              <dd><output class="reading" id="gateway-luminosity"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Sinal Wi-Fi</dt>
              <dd><output class="reading" id="gateway-wifi-signal"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Pressão</dt>
              <dd><output class="reading" id="gateway-pressure"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Altitude</dt>
              <dd><output class="reading" id="gateway-altitude"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Velocidade do Vento</dt>
              <dd><output class="reading" id="gateway-wind-speed"></output></dd>
            </div>

            <div>
              <dt class="low-opacity-text">Direção do Vento</dt>
              <dd><output class="reading" id="gateway-wind-direction"></output></dd>
            </div>

          </div>
        </div>
      </article>
    </div>
    `,
  historico: `
    <article class="container layout-column">
      <div class="section-titles" style="margin-bottom: 20px;">
        <h3 class="container-tittle" style="margin-bottom: 5px;">Histórico de Registro</h3>
        <dt class="low-opacity-text">Consulta dos últimos dados enviados pelos sensores do campus.</dt>
      </div>
      
      <div class="table-responsive" style="overflow-x: auto;">
        <table class="historico-table">
          <thead>
            <tr>
              <th>DISPOSITIVO</th>
              <th>DATA E HORA</th>
              <th>TEMPERATURA</th>
              <th>UMIDADE</th>
              <th>PRESSÃO</th>
              <th>ALTITUDE</th>
              <th>LUMINOSIDADE</th>
              <th>VEL. VENTO</th>
              <th>DIR. VENTO</th>
              <th>SINAL WI-FI</th>
            </tr>
          </thead>
          <tbody id="historico-tbody">

          </tbody>
        </table>
      </div>
    </article>
    `,
  mapa: `
    `,
  sobre: `
    <article class="container layout-column">
      <div>
        <h3 class="container-tittle" style="margin-bottom: 5px;">Sobre o Projeto</h3>
        <dt class="low-opacity-text>Informações sobre o projeto Atmosfera 4.0.</dt>
      </div>
      <div class="reading-card">
        <dd>
          O Atmosfera 4.0 é um projeto idealizado pelo professor Lucas Felfoldi na Escola SENAI “Anchieta”. A iniciativa tem como objetivo
          criar uma estação meteorológica comunitária, através da montagem, instalação, programação e monitoramento de sensores
          ambientais distribuídos pela escola. O propósito central é aplicar conhecimentos técnicos na prática, ao mesmo tempo em que
          desenvolve o sentimento de pertencimento dos alunos na unidade.

          O projeto é construído de forma multidisciplinar, integrando turmas dos cursos técnicos em Desenvolvimento de Sistemas,
          Eletrônica e Mecatrônica. Os estudantes atuam divididos em quatro frentes:
          Equipe DEV: Programação de Banco de Dados, Back-End e Front-End.
          Equipe REDES: Arquitetura da rede.
          Equipe IOT: Programação dos dispositivos de Internet das Coisas.
          Equipe MANUTENÇÃO: Instalação e manutenção física dos dispositivos.
        </dd>
      </div>
    </article>
    `,
  robo: `
    `,
};

function changeScreen(screenName) {
  const mainContainer = document.querySelector(".content-panel");

  if (screens[screenName]) {
    mainContainer.innerHTML = screens[screenName];

    if (screenName == 'home') loadingDataHome();
    if (screenName === 'historico') loadingDataHistorico();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".sidebar-item-button");

  function selectButon(clickedButton) {
    buttons.forEach((button) => {
      button.classList.toggle("is-selected", button === clickedButton);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectButon(button);
      changeScreen(button.dataset.tela);
    });
  });

  changeScreen("home");
});
