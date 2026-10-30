async function loadingDataHistorico() {
    try {
        const response = await fetch('/api/registros/historico');
        const dados = await response.json();
        const tbody = document.getElementById('historico-tbody');

        tbody.innerHTML = '';

        dados.forEach(item => {
            const tempClass = item.temperatura >= 27.0 ? 'high-temp' : 'low-temp';

            let wifiClass = 'badge-na';
            let wifiText = 'N/A';

            if (item.intensidade_wifi != null) {
                wifiText = `${item.intensidade_wifi} dBm`;

                if (item.intensidade_wifi >= -60) {
                    wifiClass = 'badge-good';
                } else if (item.intensidade_wifi >= -70) {
                    wifiClass = 'badge-medium';
                } else {
                    wifiClass = 'badge-weak';
                }
            }

            const timestampMs = Number(item.time_stamp) * 1000;
            const dateObj = new Date(timestampMs);
            const formattedDate = `${dateObj.toLocaleDateString('pt-BR')} - ${dateObj.toLocaleTimeString('pt-BR')}`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${item.nome_dispositivo}</td>
        <td>${formattedDate}</td>
        <td class="${tempClass}">${item.temperatura.toFixed(1).replace('.', ',')}°C</td>
        <td>${item.umidade}%</td>
        <td>${item.pressao} hPa</td>
        <td>${item.altitude} m</td>
        <td>${item.luminosidade}%</td>
        <td>${item.velocidade_vento.toFixed(1).replace('.', ',')} m/s</td>
        <td>${item.direcao_vento}°</td>
        <td><span class="badge ${wifiClass}">${wifiText}</span></td>
      `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar dados do histórico:", error);
    }
}