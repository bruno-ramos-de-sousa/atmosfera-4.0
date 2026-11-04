document.addEventListener("loadedScreen", (e) => {
  if (e.detail.screenName === "robo") {
    // Elementos relacionados ao robo
    const startBtn = document.getElementById("robot-button");
    const configBtn = document.getElementById("robot-config-button");
    const modalCloseBtn = document.getElementById("close-modal");
    const appShell = document.getElementById("app-shell");
    const modal = document.getElementById("modal-container");
    const inputBotRecordQnt = document.getElementById("quantity-generated-bot");
    const inputBotInterval = document.getElementById("input-bot-interval");

    // Elementos relacionados ao Card de Medias
    const updateTimer = document.getElementById("update-time");
    const avarageTemperature = document.getElementById("average-temperature");
    const avarageHumidity = document.getElementById("average-humidity");
    const avaragePressure = document.getElementById("average-pressure");

    // Elementos relacionados ao Card de Parametros Ambientais
    const luminosity = document.getElementById("luminosity-reading");
    const windSpeed = document.getElementById("wind-speed-reading");
    const windDirection = document.getElementById("wind-direction-reading");
    const altitude = document.getElementById("altitude-reading");

    // Elementos relacionados ao Card de Monitoramento dos Dispositivos
    const deviceType = document.getElementById("device-type");
    const gatewayLocation = document.getElementById("gateway-location");
    const actuatorName = document.getElementById("actuator-name");
    const actuatorStatus = document.getElementById("actuator-status");
    const canvasTemperature = document
      .getElementById("temperature-graph")
      .getContext("2d");
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

    let updateTimerValue = sessionStorage.getItem("updateTimerValue");

    var avarageCardData = {
      avarageTemperatureValue: sessionStorage.getItem(
        "avarageTemperatureValue",
      ),
      avarageHumidityValue: sessionStorage.getItem("avarageHumidityValue"),
      avaragePressureValue: sessionStorage.getItem("avaragePressureValue"),
    };

    var ambientParams = {
      luminosityValue: sessionStorage.getItem("luminosityValue"),
      windSpeedValue: sessionStorage.getItem("windSpeedValue"),
      windDirectionValue: sessionStorage.getItem("windDirectionValue"),
      altitudeValue: sessionStorage.getItem("altitudeValue"),
    };

    var areaParams = {
      deviceTypeValues: ["Gateway", "EndPoint"],
      gatewayLocationValues: ["Refeitorio", "Lab 11", "Auditorio"],
      actuatorNames: ["Led 1", "Led 2", "Led 3", "Led 4"],
      actuatorStatusValues: ["Ligado", "Desligado"],
      gatewayTemperatureValue: sessionStorage.getItem(
        "gatewayTemperatureValue",
      ),
      gatewayHumidityValue: sessionStorage.getItem("gatewayHumidityValue"),
      gatewayLuminosityValue: sessionStorage.getItem("gatewayLuminosityValue"),
      gatewayWifiSignalValue: sessionStorage.getItem("gatewayWifiSignalValue"),
      gatewayPressureValue: sessionStorage.getItem("gatewayPressureValue"),
      gatewayAltitudeValue: sessionStorage.getItem("gatewayAltitudeValue"),
      gatewayWindSpeedValue: sessionStorage.getItem("gatewayWindSpeedValue"),
      gatewayWindDirectionValue: sessionStorage.getItem(
        "gatewayWindDirectionValue",
      ),
    };

    let canvasTemperatureValues = sessionStorage.getItem(
      "canvasTemperatureValues",
    );

    let botRecordQnt = 20;
    let botInterval = 3;

    const graph = new Chart(canvasTemperature, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Temperatura (°C)",
            data: canvasTemperatureValues,
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

    updateData();

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

    function readBotForm() {
      if (!isNaN(inputBotInterval.value) && !isNaN(inputBotRecordQnt.value)) {
        botInterval = parseInt(inputBotInterval.value);
        botRecordQnt = parseInt(inputBotRecordQnt.value);
      }
    }

    function generateRandomNumber(min, max, decimalPlaces) {
      return (Math.random() * (max - min + 1) + min).toFixed(decimalPlaces);
    }

    function updateData() {
      avarageTemperature.innerText = `${avarageCardData.avarageTemperatureValue.replace(".", ",")}ºC`;
      avarageHumidity.innerText = `${avarageCardData.avarageHumidityValue}%`;
      avaragePressure.innerText = `${avarageCardData.avaragePressureValue.replace(".", ",")} hPa`;

      luminosity.innerText = `${ambientParams.luminosityValue}%`;
      windSpeed.innerText = `${ambientParams.windSpeedValue.replace(".", ",")} m/s`;
      windDirection.innerText = `(${ambientParams.windDirectionValue}º)`;
      altitude.innerText = `${ambientParams.altitudeValue}`;

      deviceType.innerText = `${areaParams.deviceTypeValues[generateRandomNumber(0, areaParams.deviceTypeValues.length - 1, 0)]}`;
      gatewayLocation.innerText = `${areaParams.gatewayLocationValues[generateRandomNumber(0, areaParams.gatewayLocationValues.length - 1, 0)]}`;
      actuatorName.innerText = `Status do atuador: (${areaParams.actuatorNames[generateRandomNumber[(0, areaParams.actuatorNames.length - 1, 0)]]})`;
      actuatorStatus.innerText = `${areaParams.actuatorStatus[generateRandomNumber(0, areaParams.actuatorStatusValues.length - 1, 0)]}`;
      gatewayTemperature.innerText = `${areaParams.gatewayTemperatureValue.replace(".", ",")}ºC`;
      gatewayHumidity.innerText = `${areaParams.gatewayHumidityValue}%`;
      gatewayLuminosity.innerText = `${areaParams.gatewayLuminosityValue}%`;
      gatewayWifiSignal.innerText = `${areaParams.gatewayPressureValue} dBm`;
      gatewayAltitude.innerText = `${areaParams.gatewayAltitudeValue} m`;
      gatewayWindSpeed.innerText = `${areaParams.gatewayWindSpeedValue.replace(".", ",")} m/s`;
      gatewayWindDirection.innerText = `(${areaParams.gatewayWindDirectionValue}º)`;
    }

    function updateTimerValues() {
      setInterval(() => {
        if (updateTimerValue < botInterval) {
          updateTimer.innerText = `Atualizado há ${(updateTimerValue += 1)} segundos`;
        } else {
          updateTimerValue = 0;
          updateTimer.innerText = `Atualizado há ${updateTimerValue} segundos`;
        }
      }, 1000);
    }

    function saveVariableInSession(name, value) {
      sessionStorage.setItem(name, value);
      return value;
    }

    function startBot() {
      let count = 0;
      updateTimerValues();
      setInterval(() => {
        if (botRecordQnt <= count) {
          avarageCardData.avarageTemperatureValue = saveVariableInSession(
            "avarageTemperatureValue",
            generateRandomNumber(12, 40, 1),
          );
          avarageCardData.avarageHumidityValue = saveVariableInSession(
            "avarageHumidityValue",
            generateRandomNumber(0, 100),
          );
          avarageCardData.avaragePressureValue = saveVariableInSession(
            "avaragePressureValue",
            generateRandomNumber(990, 1020, 2),
          );

          ambientParams.luminosityValue = saveVariableInSession(
            "luminosityValue",
            generateRandomNumber(0, 100, 0),
          );
          ambientParams.windSpeedValue = saveVariableInSession(
            "windSpeedValue",
            generateRandomNumber(0, 20, 1),
          );
          ambientParams.windDirectionValue = saveVariableInSession(
            "windDirectionValue",
            generateRandomNumber(0, 360, 0),
          );
          ambientParams.altitudeValue = saveVariableInSession(
            "altitudeValue",
            generateRandomNumber(600, 800, 0),
          );

          areaParams.gatewayTemperatureValue = saveVariableInSession(
            "gatewayTemperatureValue",
            generateRandomNumber(12, 40, 1),
          );
          areaParams.gatewayHumidityValue = saveVariableInSession(
            "gatewayHumidityValue",
            generateRandomNumber(0, 100, 0),
          );
          areaParams.gatewayLuminosityValue = saveVariableInSession(
            "gatewayLuminosityValue",
            generateRandomNumber(0, 100, 0),
          );
          areaParams.gatewayWifiSignalValue = saveVariableInSession(
            "gatewayWifiSignal",
            generateRandomNumber(-80, -30, 0),
          );
          areaParams.gatewayPressureValue = saveVariableInSession(
            "gatewayPressureValue",
            generateRandomNumber(990, 1020, 1),
          );
          areaParams.gatewayAltitudeValue = saveVariableInSession(
            "gatewayAltitudeValue",
            generateRandomNumber(600, 800, 0),
          );
          areaParams.gatewayWindSpeedValue = saveVariableInSession(
            "gatewayWindSpeedValue",
            generateRandomNumber(0, 20, 1),
          );
          areaParams.gatewayWindDirectionValue = saveVariableInSession(
            "gatewayWindDirectionValue",
            generateRandomNumber(0, 360, 0),
          );

          count++;
          updateData();
        }
      }, botInterval);
    }
  }
});
