let registroSensores = [];
let listDispositivos = [];
let currentSensor = 0;

function updateCarrossel(registro, listDispositivos) {
  const disp = listDispositivos.find(d => d.id_dispositivo === registro.id_dispositivo_fk);
  const nomeLocal = disp ? disp.nome_dispositivo : `Sensor ${registro.id_dispositivo_fk}`;

  setText('gateway-location', nomeLocal);
  setText('gateway-temperature', `${registro.temperatura.toFixed(1).replace('.', ',')}°C`);
  setText('gateway-humidity', `${registro.umidade.toFixed(1).replace('.', ',')}%`);
  setText('gateway-luminosity', `${registro.luminosidade.toFixed(1).replace('.', ',')}%`);
  setText('gateway-pressure', `${registro.pressao.toFixed(1).replace('.', ',')} hPa`);
  setText('gateway-altitude', `${registro.altitude.toFixed(1).replace('.', ',')} m`);
  setText('gateway-wind-speed', `${registro.velocidade_vento.toFixed(1).replace('.', ',')} m/s`);
  setText('gateway-wind-direction', `${registro.direcao_vento}°`);

  const wifiText = registro.intensidade_wifi != null ? `${registro.intensidade_wifi} dBm` : 'N/A';
  setText('gateway-wifi-signal', wifiText);
}

function carrosselEvents(dispositivos) {
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  if (btnPrev && btnNext) {
    btnPrev.onclick = () => {
      if (registroSensores.length === 0) return;
      currentSensor = (currentSensor - 1 + registroSensores.length) % registroSensores.length;
      updateCarrossel(registroSensores[currentSensor], dispositivos);
    }

    btnNext.onclick = () => {
      if (registroSensores.length === 0) return;
      currentSensor = (currentSensor + 1) % registroSensores.length;
      updateCarrossel(registroSensores[currentSensor], dispositivos);
    }
  }
}

function setText(id, valor) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = (valor !== undefined && valor !== null) ? valor : '--';
  }
}

async function loadingDataHome() {
  try {
    const [resRegistros, resAtuadores, resDispositivos] = await Promise.all([
      fetch('/api/registros/diarios'),
      fetch('/api/atuadores'),
      fetch('/api/dispositivos')
    ]);

    const listRegistros = await resRegistros.json();
    const listAtuadores = await resAtuadores.json();
    listDispositivos = await resDispositivos.json();

    if (Array.isArray(listRegistros) && listRegistros.length > 0) {
      const u = listRegistros[0];

      setText('average-temperature', `${u.temperatura.toFixed(1).replace('.', ',')}°C`);
      setText('average-humidity', `${u.umidade.toFixed(1).replace('.', ',')}%`);
      setText('avarage-pressure', `${u.pressao.toFixed(1).replace('.', ',')} hPa`);
      setText('luminosity-reading', `${u.luminosidade.toFixed(1).replace('.', ',')}%`);
      setText('wind-speed-reading', `${u.velocidade_vento.toFixed(1).replace('.', ',')} m/s`);
      setText('wind-direction-reading', `${u.direcao_vento}°`);
      setText('altitude-reading', `${u.altitude.toFixed(1).replace('.', ',')} m`);

      registroSensores = listRegistros.slice(0, 4);
      updateCarrossel(registroSensores[currentSensor], listDispositivos);
      carrosselEvents(listDispositivos);
    }

    if (Array.isArray(listAtuadores) && listAtuadores.length > 0) {
      const status = listAtuadores[0].status_atual ? 'Ligado' : 'Desligado';
      setText('actuator-status', status);
    }

  } catch (error) {
    console.error("Erro ao carregar dados do banco de dados:", error);
  }
}