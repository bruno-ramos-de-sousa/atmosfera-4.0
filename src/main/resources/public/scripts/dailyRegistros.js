let registroSensores = [];
let listDispositivos = [];
let listAtuadores = [];
let currentSensor = 0;
let autoRefreshInterval = null;
let updateTimerInterval = null;
let timeSinceUpdate = 0;

function updateCarousel(registro, listDispositivos) {
  const disp = listDispositivos.find(d => d.id_dispositivo === registro.id_dispositivo_fk);
  const nomeLocal = disp ? disp.nome_dispositivo : registro.id_dispositivo_fk;
  const typeDevice = disp ? disp.tipo_dispositivo : registro.tipo_dispositivo;

  document.getElementById('device-type').textContent = typeDevice;
  document.getElementById('gateway-location').textContent = nomeLocal;
  document.getElementById('gateway-temperature').textContent = `${registro.temperatura.toFixed(1).replace('.', ',')}°C`;
  document.getElementById('gateway-humidity').textContent = `${registro.umidade.toFixed(1).replace('.', ',')}%`;
  document.getElementById('gateway-luminosity').textContent = `${registro.luminosidade.toFixed(1).replace('.', ',')}%`;
  document.getElementById('gateway-pressure').textContent = `${registro.pressao.toFixed(1).replace('.', ',')} hPa`;
  document.getElementById('gateway-altitude').textContent = `${registro.altitude.toFixed(1).replace('.', ',')} m`;
  document.getElementById('gateway-wind-speed').textContent = `${registro.velocidade_vento.toFixed(1).replace('.', ',')} m/s`;
  document.getElementById('gateway-wind-direction').textContent = `${registro.direcao_vento}°`;

  const wifiText = registro.intensidade_wifi != null && registro.intensidade_wifi != 0 ? `${registro.intensidade_wifi} dBm` : 'N/A';
  document.getElementById('gateway-wifi-signal').textContent = wifiText;

  const atuador = listAtuadores.find(a => a.id_dispositivo_fk === registro.id_dispositivo_fk);
  const actuatorStatus = document.getElementById("actuator-status");
  const actuatorName = document.getElementById("actuator-name");

  if (atuador) {
    const currentStatus = Boolean(atuador.status_atual);
    const textStatus = currentStatus ? "Ligado" : "Desligado";

    actuatorName.textContent = `Status do Atuador (${atuador.nome_atuador}):`;
    actuatorStatus.innerHTML = `<span></span>${textStatus}`;
    actuatorStyle(currentStatus);
  } else {
    actuatorName.textContent = "Status do Atuador:";
    actuatorStatus.innerHTML = `<span></span>N/A`;
    actuatorStyle(null);
  }

  document.getElementById('carousel-indicator').textContent = `Área ${currentSensor + 1} de ${registroSensores.length}`;
}

function carouselEvents(dispositivos) {
  const btnPrev = document.getElementById("button-previous");
  const btnNext = document.getElementById("button-next");

  if (btnPrev && btnNext) {
    btnPrev.onclick = () => {
      if (registroSensores.length === 0) return;
      currentSensor = (currentSensor - 1 + registroSensores.length) % registroSensores.length;
      updateCarousel(registroSensores[currentSensor], dispositivos);
    }

    btnNext.onclick = () => {
      if (registroSensores.length === 0) return;
      currentSensor = (currentSensor + 1) % registroSensores.length;
      updateCarousel(registroSensores[currentSensor], dispositivos);
    }
  }
}

function temperatureStyle(data) {
  const temperatureEl = document.getElementById('average-temperature');

  let temperatureValue;

  if (data !== undefined && data !== null) {
    temperatureValue = (typeof data === 'object') ? Number(data.temperatura) : Number(data);
  } else {
    temperatureValue = parseFloat(temperatureEl.textContent.replace(',', '.'));
  }

  if (isNaN(temperatureValue)) {
    temperatureEl.style.color = '';
    return;
  }

  if (temperatureValue >= 26) {
    temperatureEl.style.color = 'var(--secondary-orange)';
  } else if (temperatureValue >= 18) {
    temperatureEl.style.color = '#08d808';
  } else {
    temperatureEl.style.color = 'var(--secondary-blue)';
  }
}

function actuatorStyle(status) {
  const actuatorStatusEl = document.getElementById("actuator-status");
  if (!actuatorStatusEl) return;

  const spanDot = actuatorStatusEl.querySelector("span");
  let currentStatus;

  if (status !== undefined && status !== null) {
    currentStatus = (typeof status === "boolean") ? status : (status.trim() === "Ligado");
  } else {
    const text = actuatorStatusEl.textContent.trim();
    if (text === "Ligado") currentStatus = true;
    else if (text === "Desligado") currentStatus = false;
  }

  if (currentStatus === true) {
    actuatorStatusEl.style.backgroundColor = "#76c276";
    actuatorStatusEl.style.color = "#006400";
    if (spanDot) spanDot.style.backgroundColor = "#006400";
  } else if (currentStatus === false) {
    actuatorStatusEl.style.backgroundColor = "#efacaa";
    actuatorStatusEl.style.color = "#d93025";
    if (spanDot) spanDot.style.backgroundColor = "#d93025";
  } else {
    actuatorStatusEl.style.backgroundColor = "";
    actuatorStatusEl.style.color = "";
    if (spanDot) spanDot.style.backgroundColor = "";
  }
}

function formatTime(totalSeconds) {
  if (totalSeconds < 60) {
    const unit = totalSeconds === 1 ? 'segundo' : 'segundos';
    return `Atualizado há ${totalSeconds} ${unit}`;
  }

  if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60);
    const unit = minutes === 1 ? 'minuto' : 'minutos';
    return `Atualizado há ${minutes} ${unit}`;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const unit = hours === 1 ? 'hora' : 'horas';
  return `Atualizado há ${hours} ${unit}`;
}

function resetUpdateTimer() {
  stopUpdateTimer();
  timeSinceUpdate = 0;

  const updateTimeEl = document.getElementById('update-time');
  if (updateTimeEl) {
    updateTimeEl.textContent = formatTime(timeSinceUpdate);
  }

  updateTimerInterval = setInterval(() => {
    timeSinceUpdate += 1;
    const el = document.getElementById('update-time');
    if (el) {
      el.textContent = formatTime(timeSinceUpdate);
    }
  }, 1000);
}

function stopUpdateTimer() {
  if (updateTimerInterval) {
    clearInterval(updateTimerInterval);
    updateTimerInterval = null;
  }
}

function autoRefresh() {
  stopAutoRefresh();
  autoRefreshInterval = setInterval(function () {
    loadingDataHome();
  }, 5000);
}

function stopAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  }
  stopUpdateTimer();
}

function calculateAverage(list, field) {
  const values = list.map(item => Number(item[field]));

  const sum = values.reduce((accumulated, value) => accumulated + value, 0);
  return sum / values.length;
}

async function loadingDataHome() {
  if (document.getElementById('robot-button')) {
    return;
  }

  try {
    const [resRegistros, resAtuadores, resDispositivos] = await Promise.all([
      fetch('/api/registros/diarios'),
      fetch('/api/atuadores'),
      fetch('/api/dispositivos')
    ]);

    const listRegistros = await resRegistros.json();
    const atuadoresFetch = await resAtuadores.json();
    listDispositivos = await resDispositivos.json();
    listAtuadores = atuadoresFetch;

    if (Array.isArray(listRegistros) && listRegistros.length > 0) {
      registroSensores = listRegistros.slice(0, 4);

      const averageTemperature = calculateAverage(registroSensores, 'temperatura');
      const averageHumidity = calculateAverage(registroSensores, 'umidade');
      const averagePressure = calculateAverage(registroSensores, 'pressao');
      const averageLuminosity = calculateAverage(registroSensores, 'luminosidade');
      const averageWindSpeed = calculateAverage(registroSensores, 'velocidade_vento');
      const averageWindDirection = calculateAverage(registroSensores, 'direcao_vento');
      const averageAltitude = calculateAverage(registroSensores, 'altitude');

      document.getElementById('average-temperature').textContent = `${averageTemperature.toFixed(1).replace('.', ',')}°C`;
      temperatureStyle(averageTemperature);
      document.getElementById('average-humidity').textContent = `${averageHumidity.toFixed(1).replace('.', ',')}%`;
      document.getElementById('average-pressure').textContent = `${averagePressure.toFixed(1).replace('.', ',')} hPa`;

      document.getElementById('average-luminosity').textContent = `${averageLuminosity.toFixed(1).replace('.', ',')}%`;
      document.getElementById('average-wind-speed').textContent = `${averageWindSpeed.toFixed(1).replace('.', ',')} m/s`;
      document.getElementById('average-wind-direction').textContent = `${Math.round(averageWindDirection)}°`;
      document.getElementById('average-altitude').textContent = `${averageAltitude.toFixed(1).replace('.', ',')} m`;

      updateCarousel(registroSensores[currentSensor], listDispositivos);
      carouselEvents(listDispositivos);
      resetUpdateTimer();
    }

  } catch (error) {
    console.error("Erro ao carregar dados do banco de dados:", error);
  }
}