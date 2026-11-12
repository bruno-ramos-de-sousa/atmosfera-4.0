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
    const configFormBot = document.getElementById("bot-config-form");

    // Elementos relacionados ao Card de Medias
    const updateTimer = document.getElementById("update-time");
    const avarageTemperature = document.getElementById("average-temperature");
    const avarageHumidity = document.getElementById("average-humidity");
    const avaragePressure = document.getElementById("avarage-pressure");

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

    let updateTimerValue =
      Number(sessionStorage.getItem("updateTimerValue")) || 0;
    let robotGenerationIntervalId = null;
    let robotUpdateTimerIntervalId = null;
    let robotCount = 0;

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

    let canvasTemperatureValues = getVariableFromSession(
      "canvasTemperatureValues",
      [],
    );
    let canvasTimeValues = getVariableFromSession("canvasTimeValues", []);
    let botRecordQnt = 20;
    let botInterval = 3000;

    const graph = new Chart(canvasTemperature, {
      type: "line",
      data: {
        labels: canvasTimeValues,
        datasets: [
          {
            label: "Temperatura (°C)",
            data: canvasTemperatureValues,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeInOutQuart",
          plugins: {
            legend: {
              position: top,  
            },
            title: {
              display: true,
              text: "Ultimas Leituras de Temperatura",
            },
          },
          scales: {
            y: {
              min: 10,
              max: 40,
            },
          },
        },
      },
    });

    updateData();

    function saveVariableInSession(name, value) {
      sessionStorage.setItem(name, JSON.stringify(value));
      return value;
    }

    function getVariableFromSession(name, fallback) {
      const item = sessionStorage.getItem(name);
      if (!item) return fallback;
      try {
        return JSON.parse(item);
      } catch {
        return fallback;
      }
    }

    function generateData() {
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

      canvasTemperatureValues.push(generateRandomNumber(12, 40, 1));
      saveVariableInSession("canvasTemperatureValues", canvasTemperatureValues);

      canvasTimeValues.push(new Date().toLocaleTimeString());
      saveVariableInSession("canvasTimeValues", canvasTimeValues);

      if (canvasTemperatureValues.length > 10 || canvasTimeValues.length > 10) {
        canvasTemperatureValues.shift();
        saveVariableInSession(
          "canvasTemperatureValues",
          canvasTemperatureValues,
        );
        canvasTimeValues.shift();
        saveVariableInSession("canvasTimeValues", canvasTimeValues);
      }

      graph.data.labels = canvasTimeValues;
      graph.data.datasets[0].data = canvasTemperatureValues;
      graph.update();

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
    }

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

    configFormBot.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!isNaN(inputBotInterval.value) && !isNaN(inputBotRecordQnt.value)) {
        botInterval = parseInt(inputBotInterval.value * 1000);
        botRecordQnt = parseInt(inputBotRecordQnt.value);
        console.log(botInterval, botRecordQnt);
      }
    });

    function generateRandomNumber(min, max, decimalPlaces) {
      return Number((Math.random() * (max - min) + min).toFixed(decimalPlaces));
    }

    function updateData() {
      avarageTemperature.innerText = `${avarageCardData.avarageTemperatureValue || 0}ºC`;
      avarageHumidity.innerText = `${avarageCardData.avarageHumidityValue || 0}%`;
      avaragePressure.innerText = `${avarageCardData.avaragePressureValue || 0} hPa`;

      luminosity.innerText = `${ambientParams.luminosityValue || 0}%`;
      windSpeed.innerText = `${ambientParams.windSpeedValue || 0} m/s`;
      windDirection.innerText = `${ambientParams.windDirectionValue || 0}º`;
      altitude.innerText = `${ambientParams.altitudeValue || 0}`;

      deviceType.innerText = `${areaParams.deviceTypeValues[generateRandomNumber(0, areaParams.deviceTypeValues.length - 1, 0)]}`;
      gatewayLocation.innerText = `${areaParams.gatewayLocationValues[generateRandomNumber(0, areaParams.gatewayLocationValues.length - 1, 0)]}`;
      actuatorName.innerText = `Status do atuador: (${areaParams.actuatorNames[generateRandomNumber(0, areaParams.actuatorNames.length - 1, 0)]})`;
      actuatorStatus.innerHTML = `<span></span>${areaParams.actuatorStatusValues[generateRandomNumber(0, areaParams.actuatorStatusValues.length - 1, 0)]}`;
      gatewayTemperature.innerText = `${areaParams.gatewayTemperatureValue || 0}ºC`;
      gatewayHumidity.innerText = `${areaParams.gatewayHumidityValue || 0}%`;
      gatewayLuminosity.innerText = `${areaParams.gatewayLuminosityValue || 0}%`;
      gatewayWifiSignal.innerText = `${areaParams.gatewayPressureValue || 0} dBm`;
      gatewayPressure.innerText = `${areaParams.gatewayPressureValue || 0} hPa`;
      gatewayAltitude.innerText = `${areaParams.gatewayAltitudeValue || 0} m`;
      gatewayWindSpeed.innerText = `${areaParams.gatewayWindSpeedValue || 0} m/s`;
      gatewayWindDirection.innerText = `${areaParams.gatewayWindDirectionValue || 0}º`;
      graph.update();
    }

    function stopRobotIntervals() {
      if (robotGenerationIntervalId) {
        clearInterval(robotGenerationIntervalId);
        robotGenerationIntervalId = null;
      }

      if (robotUpdateTimerIntervalId) {
        clearInterval(robotUpdateTimerIntervalId);
        robotUpdateTimerIntervalId = null;
      }

      updateTimerValue = 0;
      updateTimer.innerText = `Atualizado há ${updateTimerValue} segundos`;
    }
    startBtn.addEventListener("click", () => {
      if (startBtn.classList.contains("active")) {
        startBtn.innerText = "Ligar";
        startBtn.style.backgroundColor = "var(--primary-orange)";
        startBtn.classList.remove("active");
        stopRobotIntervals();
        return;
      }

      startBtn.innerText = "Desligar";
      startBtn.style.backgroundColor = "var(--medium-black)";
      startBtn.classList.add("active");

      stopRobotIntervals();

      robotUpdateTimerIntervalId = setInterval(() => {
        if (updateTimerValue < Math.max(botInterval / 1000 - 1, 0)) {
          updateTimerValue += 1;
          updateTimer.innerText = `Atualizado há ${updateTimerValue} segundos`;
        } else {
          updateTimerValue = 0;
          updateTimer.innerText = `Atualizado há ${updateTimerValue} segundos`;
        }
      }, 1000);

      robotCount = 0;
      robotGenerationIntervalId = setInterval(() => {
        if (
          robotCount >= botRecordQnt ||
          !startBtn.classList.contains("active") ||
          e.detail.screenName !== "robo"
        ) {
          stopRobotIntervals();
          startBtn.innerText = "Ligar";
          startBtn.style.backgroundColor = "var(--primary-orange)";
          startBtn.classList.remove("active");
          return;
        }

        generateData();

        robotCount += 1;
        updateData();
      }, botInterval);
    });
  }
});
