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

    const registros = await resRegistros.json();
    const atuadores = await resAtuadores.json();
    const dispositivos = await resDispositivos.json();

    if (Array.isArray(registros) && registros.length > 0) {
      const u = registros[0];

      setText('average-temperature', `${u.temperatura.toLocaleString('pt-BR')}°C`);
      setText('average-humidity', `${u.umidade.toLocaleString('pt-BR')}%`);
      setText('avarage-pressure', `${u.pressao.toLocaleString('pt-BR')} hPa`);
      setText('luminosity-reading', `${u.luminosidade.toLocaleString('pt-BR')} Lux`);
      setText('wind-speed-reading', `${u.velocidade_vento.toLocaleString('pt-BR')} m/s`);
      setText('wind-direction-reading', `${u.direcao_vento}°`);
      setText('altitude-reading', `${u.altitude.toLocaleString('pt-BR')} m`);

      setText('gateway-temperature', `${u.temperatura.toLocaleString('pt-BR')}°C`);
      setText('gateway-humidity', `${u.umidade.toLocaleString('pt-BR')}%`);
      setText('gateway-luminosity', `${u.luminosidade.toLocaleString('pt-BR')} Lux`);
      setText('gateway-pressure', `${u.pressao.toLocaleString('pt-BR')} hPa`);
      setText('gateway-altitude', `${u.altitude.toLocaleString('pt-BR')} m`);
      setText('gateway-wind-speed', `${u.velocidade_vento.toLocaleString('pt-BR')} m/s`);
      setText('gateway-wind-direction', `${u.direcao_vento}°`);
      setText('gateway-wifi-signal', `${u.intensidade_wifi} dBm`);
    }

    if (Array.isArray(atuadores) && atuadores.length > 0) {
      const status = atuadores[0].status_atual ? 'Ligado' : 'Desligado';
      setText('actuator-status', status);
    }

    if (Array.isArray(dispositivos) && dispositivos.length > 0) {
      setText('gateway-location', dispositivos[0].nome_dispositivo);
    }

  } catch (error) {
    console.error("Erro ao carregar dados do banco de dados:", error);
  }
}