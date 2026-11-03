document.addEventListener("loadedScreen", (e) => {
  if (e.detail.screenName === "robo") {
    const startBtn = document.getElementById("robot-button");
    const configBtn = document.getElementById("robot-config-button");
    const modalCloseBtn = document.getElementById("close-modal");
    const appShell = document.getElementById("app-shell");
    const modal = document.getElementById("modal-container");

    const updateTimer = document.getElementById("update-time");
    const avarageTemperature = document.getElementById("average-temperature");
    const avarageHumidity = document.getElementById("average-humidity");
    const avaragePressure = document.getElementById("average-pressure");

    const luminosity = document.getElementById("luminosity-reading");
    const windSpeed = document.getElementById("wind-speed-reading");
    const windDirection = document.getElementById("wind-direction-reading");
    const altitude = document.getElementById("altitude-reading");

    const deviceType = document.getElementById("device-type");
    const gatewayLocation = document.getElementById("gateway-location");
    const actuatorStatus = document.getElementById("actuator-status");
    const canvasTemperature = document
      .getElementById("temperature-graph")
      .getContext("2d");

    const graph = new Chart(canvasTemperature, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Temperatura (°C)",
            data: [0, 1, 23, 52, 12, 33, 44, 55, 22, 11, 5, 0],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 60,
          },
        },
      },
    });

    const gatewayTemperature = document.getElementById("gateway-temperature");
    const gatewayHumidity = document.getElementById("gateway-humidity");
    const gatewayLuminosity = document.getElementById("gateway-luminosity");
    const gatewayWifiSignal = document.getElementById("gateway-wifi-signal");
    const gatewayPressure = document.getElementById("gateway-pressure");
    const gatewayAltitude = document.getElementById("gateway-altitude");
    const gatewayWindSpeed = document.getElementById("gateway-wind-speed");
    const gatewayWindDirection = document.getElementById(
      "gateway-wind-direction",
    );

    startBtn.addEventListener("click", () => {
      if (startBtn.classList.contains("active")) {
        startBtn.innerText = "Ligar";
        startBtn.style.backgroundColor = "var(--primary-orange)";
        startBtn.classList.remove("active");
      } else {
        startBtn.innerText = "Desligar";
        startBtn.style.backgroundColor = "var(--medium-black)";
        startBtn.classList.add("active");
      }
    });

    configBtn.addEventListener("click", () => {
      modal.classList.toggle("active");
    });

    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    appShell.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("active");
      }
    });

    function generateRandomNumber(min, max, decimalPlaces) {
      return (Math.random() * (max - min + 1) + min).toFixed(decimalPlaces);
    }

    function updateData(element, value) {
      element.innerText = value;
    }
  }
});
