const screens = {
  home: `
    <div id="dashboard">
          <article class="container" id="average-card">
            <h3 class="container-tittle">
              Média do Campus<small class="low-opacity-text" id="update-time"
                >Atualizado há 30 segundos</small
              >
            </h3>

            <dd>
              <output class="reading" id="average-temperature">26,1°C</output>
              <span class="low-opacity-text">Tempo Limpo</span>
            </dd>

            <hr />

            <dl class="metric-grid">
              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Umidade Média</dt>
                <dd>
                  <output class="reading" id="average-humidity">90%</output>
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Pressão Média</dt>
                <dd>
                  <output class="reading" id="avarage-pressure"
                    >922,73 hPa</output
                  >
                </dd>
              </div>
            </dl>
          </article>
          <article class="container layout-column" id="enviroment-parameters-card">
            <h3 class="container-tittle">Outros Parâmetros Ambientais</h3>
            <dl class="metric-grid">
              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Luminosidade</dt>
                <dd>
                  <output class="reading" id="luminosity-reading">72%</output>
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Vel. Vento</dt>
                <dd>
                  <output class="reading" id="wind-speed-reading"
                    >3,3 m/s</output
                  >
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Dir. Vento</dt>
                <dd>
                  <output class="reading" id="wind-direction-reading"
                    >Sul (179°)</output
                  >
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Altitude</dt>
                <dd>
                  <output class="reading" id="altitude-reading">781 m</output>
                </dd>
              </div>
            </dl>

            <canvas id="temperature-graph"></canvas>
          </article>
          <article class="container layout-column" id="device-reading-card">
            <div class="layout-row">
              <div>
                <h3 class="container-tittle">Monitoramento por Área</h3>
                <dt class="low-opacity-text">
                  Navegue pelos sensores individuais do campus.
                </dt>
              </div>
              <div id="corrosel-dis">
                <div class="container"><p>Area 1 de 3</p></div>
                <div class="container"><button id="button-backward"><span></span><span></span></button></div>
                <div class="container"><button id="button-forward"><span></span><span></span></button></div>
              </div>
            </div>

            <div class="reading-card layout-row">
              <div>
                <span id="device-type"> <span></span>Gateway</span>

                <dd>
                  <output class="reading" id="gateway-location"
                    >Sensor Refeitorio</output
                  >
                </dd>
                <dt class="low-opacity-text">Status do Atuador (Led 1):</dt>

                <dd>
                  <output class="reading" id="actuator-status"
                    ><span></span>Ligado</output
                  >
                </dd>
              </div>

              <div class="metric-grid container">
                <div>
                  <dt class="low-opacity-text">Temperatura</dt>
                  <dd>
                    <output class="reading" id="gateway-temperature"
                      >26,8°C</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Umidade</dt>
                  <dd>
                    <output class="reading" id="gateway-humidity">93%</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Luminosidade</dt>
                  <dd>
                    <output class="reading" id="gateway-luminosity">72%</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Sinal Wi-Fi</dt>
                  <dd>
                    <output class="reading" id="gateway-wifi-signal"
                      >52 dBm</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Pressão</dt>
                  <dd>
                    <output class="reading" id="gateway-pressure"
                      >921,9 hPa</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Altitude</dt>
                  <dd>
                    <output class="reading" id="gateway-altitude">781 m</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Velocidade do Vento</dt>
                  <dd>
                    <output class="reading" id="gateway-wind-speed"
                      >3,6 m/s</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Direção do Vento</dt>
                  <dd>
                    <output class="reading" id="gateway-wind-direction"
                      >Sul (178°)</output
                    >
                  </dd>
                </div>
              </div>
            </div>
          </article>
        </div>

        <script src="scripts/dailyRegistros.js"></script>
        <script src="scripts/robot.js"></script>

        <span id="expand-button"> </span>
        `,
  historico: `
        `,
  mapa: `
        `,
  sobre: `
        `,
  robo: `<div id="dashboard">
          <div class="robot-container layout-row">
            <button id="robot-button">Ligar</button>
            <button id="robot-config-button">
              <img
                src="assets/settings-icon.svg"
                alt="Engrenagem"
                class="icon"
              />Configurar Bot
            </button>
          </div>
          <article class="container" id="average-card">
            <h3 class="container-tittle">
              Média do Campus<small class="low-opacity-text" id="update-time"
                >Atualizado há 30 segundos</small
              >
            </h3>

            <dd>
              <output class="reading" id="average-temperature">26,1°C</output>
              <span class="low-opacity-text">Tempo Limpo</span>
            </dd>

            <hr />

            <dl class="metric-grid">
              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Umidade Média</dt>
                <dd>
                  <output class="reading" id="average-humidity">90%</output>
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Pressão Média</dt>
                <dd>
                  <output class="reading" id="avarage-pressure"
                    >922,73 hPa</output
                  >
                </dd>
              </div>
            </dl>
          </article>
          <article class="container layout-column" id="enviroment-parameters-card">
            <h3 class="container-tittle">Outros Parâmetros Ambientais</h3>
            <dl class="metric-grid">
              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Luminosidade</dt>
                <dd>
                  <output class="reading" id="luminosity-reading">72%</output>
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Vel. Vento</dt>
                <dd>
                  <output class="reading" id="wind-speed-reading"
                    >3,3 m/s</output
                  >
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Dir. Vento</dt>
                <dd>
                  <output class="reading" id="wind-direction-reading"
                    >Sul (179°)</output
                  >
                </dd>
              </div>

              <div class="reading-card layout-column">
                <dt class="low-opacity-text">Altitude</dt>
                <dd>
                  <output class="reading" id="altitude-reading">781 m</output>
                </dd>
              </div>
            </dl>

            <canvas id="temperature-graph"></canvas>
          </article>
          <article class="container layout-column" id="device-reading-card">
            <div class="layout-row">
              <div>
                <h3 class="container-tittle">Monitoramento por Área</h3>
                <dt class="low-opacity-text">
                  Navegue pelos sensores individuais do campus.
                </dt>
              </div>
              <div id="corrosel-dis">
                <div class="container"><p>Area 1 de 3</p></div>
                <div class="container"><button id="button-backward"><span></span><span></span></button></div>
                <div class="container"><button id="button-forward"><span></span><span></span></button></div>
              </div>
            </div>

            <div class="reading-card layout-row">
              <div>
                <span id="device-type"> <span></span>Gateway</span>

                <dd>
                  <output class="reading" id="gateway-location"
                    >Sensor Refeitorio</output
                  >
                </dd>
                <dt class="low-opacity-text">Status do Atuador (Led 1):</dt>

                <dd>
                  <output class="reading" id="actuator-status"
                    ><span></span>Ligado</output
                  >
                </dd>
              </div>

              <div class="metric-grid container">
                <div>
                  <dt class="low-opacity-text">Temperatura</dt>
                  <dd>
                    <output class="reading" id="gateway-temperature"
                      >26,8°C</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Umidade</dt>
                  <dd>
                    <output class="reading" id="gateway-humidity">93%</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Luminosidade</dt>
                  <dd>
                    <output class="reading" id="gateway-luminosity">72%</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Sinal Wi-Fi</dt>
                  <dd>
                    <output class="reading" id="gateway-wifi-signal"
                      >52 dBm</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Pressão</dt>
                  <dd>
                    <output class="reading" id="gateway-pressure"
                      >921,9 hPa</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Altitude</dt>
                  <dd>
                    <output class="reading" id="gateway-altitude">781 m</output>
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Velocidade do Vento</dt>
                  <dd>
                    <output class="reading" id="gateway-wind-speed"
                      >3,6 m/s</output
                    >
                  </dd>
                </div>

                <div>
                  <dt class="low-opacity-text">Direção do Vento</dt>
                  <dd>
                    <output class="reading" id="gateway-wind-direction"
                      >Sul (178°)</output
                    >
                  </dd>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div id="modal-container" class="modal">
          <form id="bot-config-form" class="modal-content">
            <button type="button" id="close-modal" class="close" aria-label="Fechar">&times;</button>
            <h2>Configurar bot</h2>
            <label for="quantity-generated-bot">Quantidade de registros:</label>
            <input
              type="number"
              placeholder="20... 50"
              id="quantity-generated-bot"
              name="quantity"
              min="1"
              step="1"
              required
            />
            <label for="input-bot-interval">Intervalo entre registros (segundos):</label>
            <input
              type="number"
              placeholder="1... 5"
              id="input-bot-interval"
              name="interval"
              min="1"
              step="1"
              required
            />
            <button type="submit" class="modal-submit">Salvar configuração</button>
          </form>
        </div>

        <span id="expand-button"> </span>
        `,
};

function changeScreen(screenName) {
  const mainContainer = document.querySelector(".content-panel");

  if (screens[screenName]) {
    mainContainer.innerHTML = screens[screenName];
  }

  if (screenName === "robo") {
    mainContainer.classList.toggle("robot");
  }
}


