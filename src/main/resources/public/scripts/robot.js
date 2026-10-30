const contentPanel = document.querySelector(".content-panel");
const updateTimer = document.getElementById("update-time");
let intervalId = null;
let botConfiguration = {
  quantity: 50,
  intervalSeconds: 1,
};
const temperatureRecords = [];

function randomNumber(minimum, maximum, decimalPlaces = 0) {
  const factor = 10 ** decimalPlaces;
  return (
    Math.round((Math.random() * (maximum - minimum) + minimum) * factor) / factor
  );
}

function normalizeNumber(valor, decimalPlaces = 0) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

function updateReading(id, valor) {
  const reading = contentPanel.querySelector(`#${id}`);
  if (reading) reading.textContent = valor;
}

function drawTemperatureChart() {
  const canvas = contentPanel.querySelector("#temperature-graph");
  if (!canvas) return;

  const { width, height } = canvas.getBoundingClientRect();
  if (!width || !height) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.font = "14px inter, sans-serif";
  context.fillStyle = "#333";
  context.strokeStyle = "#b8b8b8";
  context.lineWidth = 1;

  const margin = { top: 16, right: 16, bottom: 76, left: 58 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  if (plotWidth <= 0 || plotHeight <= 0) return;

  const temperatures = temperatureRecords.map((record) => record.temperature);
  const minimum = Math.min(...temperatures);
  const maximum = Math.max(...temperatures);
  const padding = Math.max((maximum - minimum) * 0.1, 1);
  const minimumAxis = Math.floor(minimum - padding);
  const maximumAxis = Math.ceil(maximum + padding);

  for (let tick = 0; tick <= 4; tick += 1) {
    const ratio = tick / 4;
    const y = margin.top + plotHeight * ratio;
    const value = maximumAxis - (maximumAxis - minimumAxis) * ratio;

    context.beginPath();
    context.moveTo(margin.left, y);
    context.lineTo(width - margin.right, y);
    context.stroke();
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillText(normalizeNumber(value, 1), margin.left - 8, y);
  }

  context.beginPath();
  context.strokeStyle = "#ed7d31";
  context.lineWidth = 2;

  temperatureRecords.forEach((record, index) => {
    const x =
      margin.left +
      (temperatureRecords.length === 1
        ? plotWidth / 2
        : (plotWidth * index) / (temperatureRecords.length - 1));
    const y =
      margin.top +
      ((maximumAxis - record.temperature) / (maximumAxis - minimumAxis)) *
        plotHeight;

    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();

  temperatureRecords.forEach((record, index) => {
    const x =
      margin.left +
      (temperatureRecords.length === 1
        ? plotWidth / 2
        : (plotWidth * index) / (temperatureRecords.length - 1));
    const y =
      margin.top +
      ((maximumAxis - record.temperature) / (maximumAxis - minimumAxis)) *
        plotHeight;

    context.beginPath();
    context.fillStyle = "#ed7d31";
    context.arc(x, y, 3, 0, Math.PI * 2);
    context.fill();

    context.save();
    context.translate(x, margin.top + plotHeight + 10);
    context.rotate(-Math.PI / 4);
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "#333";
    context.fillText(
      record.timestamp.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      0,
      0,
    );
    context.restore();
  });

  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.fillText("Hora de coleta", margin.left + plotWidth / 2, height - 8);
  context.save();
  context.translate(14, margin.top + plotHeight / 2);
  context.rotate(-Math.PI / 2);
  context.fillText("Temperatura (°C)", 0, 0);
  context.restore();

  canvas.setAttribute(
    "aria-label",
    "Gráfico de linha com as últimas 10 leituras de temperatura por hora de coleta",
  );
  canvas.setAttribute("role", "img");
}

function recordTemperature(temperature) {
  temperatureRecords.push({ temperature, timestamp: new Date() });
  if (temperatureRecords.length > 10) temperatureRecords.shift();
  drawTemperatureChart();
}

function updateDashboard() {
  const temperaturaMedia = randomNumber(18, 35, 1);
  const temperaturaGateway = randomNumber(18, 35, 1);
  const umidadeMedia = randomNumber(30, 95);
  const umidadeGateway = randomNumber(30, 95);
  const pressaoMedia = randomNumber(910, 1030, 1);
  const pressaoGateway = randomNumber(910, 1030, 1);
  const luminosidade = randomNumber(0, 100);
  const velocidadeVentoMedia = randomNumber(0, 15, 1);
  const velocidadeVentoGateway = randomNumber(0, 15, 1);
  const direcaoVento = randomNumber(0, 359);
  const direcoes = [
    "Norte",
    "Nordeste",
    "Leste",
    "Sudeste",
    "Sul",
    "Sudoeste",
    "Oeste",
    "Noroeste",
  ];
  const direcaoCardeal =
    direcoes[Math.round(direcaoVento / 45) % direcoes.length];
  const altitude = randomNumber(760, 800);
  const sinalWifi = randomNumber(-90, -35);

  updateReading(
    "average-temperature",
    `${normalizeNumber(temperaturaMedia, 1)}°C`,
  );
  recordTemperature(temperaturaMedia);
  updateReading("average-humidity", `${umidadeMedia}%`);
  updateReading("avarage-pressure", `${normalizeNumber(pressaoMedia, 1)} hPa`);
  updateReading("luminosity-reading", `${luminosidade}%`);
  updateReading(
    "wind-speed-reading",
    `${normalizeNumber(velocidadeVentoMedia, 1)} m/s`,
  );
  updateReading(
    "wind-direction-reading",
    `${direcaoCardeal} (${direcaoVento}°)`,
  );
  updateReading("altitude-reading", `${altitude} m`);
  updateReading(
    "gateway-temperature",
    `${normalizeNumber(temperaturaGateway, 1)}°C`,
  );
  updateReading("gateway-humidity", `${umidadeGateway}%`);
  updateReading("gateway-luminosity", `${luminosidade}%`);
  updateReading("gateway-wifi-signal", `${sinalWifi} dBm`);
  updateReading(
    "gateway-pressure",
    `${normalizeNumber(pressaoGateway, 1)} hPa`,
  );
  updateReading("gateway-altitude", `${altitude} m`);
  updateReading(
    "gateway-wind-speed",
    `${normalizeNumber(velocidadeVentoGateway, 1)} m/s`,
  );
  updateReading(
    "gateway-wind-direction",
    `${direcaoCardeal} (${direcaoVento}°)`,
  );
  updateReading("update-time",
    `Atualizado há ${intervalInSeconds} segundos`
  );
}

function generateRandomValues(quantityOfRecords, intervalInSeconds) {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  let generatedRecords = 0;
  intervalId = setInterval(() => {
    updateDashboard();
    generatedRecords += 1;

    if (generatedRecords >= quantityOfRecords) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, intervalInSeconds * 1000);
}

contentPanel.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const modal = contentPanel.querySelector("#modal-container");

  if (event.target.closest("#robot-config-button")) {
    modal?.classList.add("active");
  } else if (event.target.closest("#close-modal") || event.target === modal) {
    modal?.classList.remove("active");
  } else if (event.target.closest("#robot-button")) {
    generateRandomValues(
      botConfiguration.quantity,
      botConfiguration.intervalSeconds,
    );
  }
});

contentPanel.addEventListener("submit", (event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  if (event.target.id !== "bot-config-form") return;

  event.preventDefault();
  const quantity = Number(
    event.target.querySelector("#quantity-generated-bot").value,
  );
  const intervalSeconds = Number(
    event.target.querySelector("#input-bot-interval").value,
  );

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    !Number.isInteger(intervalSeconds) ||
    intervalSeconds < 1
  ) {
    event.target.reportValidity();
    return;
  }

  botConfiguration = { quantity, intervalSeconds };
  contentPanel.querySelector("#modal-container")?.classList.remove("active");
});

const initialTemperature = Number(
  contentPanel
    .querySelector("#average-temperature")
    ?.textContent.replace(/[^\d,-]/g, "")
    .replace(",", "."),
);
if (Number.isFinite(initialTemperature)) {
  recordTemperature(initialTemperature);
}

const dashboardObserver = new MutationObserver(drawTemperatureChart);
dashboardObserver.observe(contentPanel, { childList: true });
window.addEventListener("resize", drawTemperatureChart);