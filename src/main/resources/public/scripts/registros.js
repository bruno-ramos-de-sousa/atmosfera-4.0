document.addEventListener("loadedScreen", (e) => {
  if (e.detail.screenName === "historico") {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");

    async function loadingDataHistorico() {
      try {
        const searchBarValue = searchBar.value;
        const cleanValue = searchBarValue.trim();

        const formattedDate = cleanValue
          ? cleanValue.split("/").reverse().join("-").padStart(10, "0")
          : "";

        const date = cleanValue === "" ? "" : `${formattedDate}T00:00:00`;

        const [dateSearch, responseDispositivos] = await Promise.all([
          fetch(`/api/registros/${encodeURIComponent(date)}`),
          fetch('/api/dispositivos')
        ]);
      
        const dados = await dateSearch.json();
        const dispositivos = await responseDispositivos.json();
        const tbody = document.getElementById("historico-tbody");

        tbody.innerHTML = "";

        dados.forEach((item) => {
          const tempClass = item.temperatura >= 27.0 ? "high-temp" : "low-temp";

          let wifiClass = "badge-na";
          let wifiText = "N/A";

          if (item.intensidade_wifi != null) {
            wifiText = `${item.intensidade_wifi} dBm`;

            if (item.intensidade_wifi >= -60) {
              wifiClass = "badge-good";
            } else if (item.intensidade_wifi >= -70) {
              wifiClass = "badge-medium";
            } else {
              wifiClass = "badge-weak";
            }
          }

          const timestampMs = Number(item.time_stamp) * 1000;
          const dateObj = new Date(timestampMs);
          const formattedDate = `${dateObj.toLocaleDateString("pt-BR")} - ${dateObj.toLocaleTimeString("pt-BR")}`;

          const disp = dispositivos.find(d => d.id_dispositivo === item.id_dispositivo_fk);
          const nomeLocal = disp ? disp.nome_dispositivo : item.id_dispositivo_fk;

          const tr = document.createElement("tr");
          tr.innerHTML = `
        <td>${nomeLocal}</td>
        <td>${formattedDate}</td>
        <td class="${tempClass}">${item.temperatura.toFixed(1).replace(".", ",")}°C</td>
        <td>${item.umidade.toFixed(1).replace(".", ",")}%</td>
        <td>${item.pressao.toFixed(1).replace(".", ",")} hPa</td>
        <td>${item.altitude.toFixed(1).replace(".", ",")} m</td>
        <td>${item.luminosidade.toFixed(1).replace(".", ",")}%</td>
        <td>${item.velocidade_vento.toFixed(1).replace(".", ",")} m/s</td>
        <td>${item.direcao_vento}°</td>
        <td><span class="badge ${wifiClass}">${wifiText}</span></td>
      `;
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error("Erro ao carregar dados do histórico:", error);
      }
    }

    searchBar.addEventListener("input", () => {
      let v = searchBar.value.replace(/\D/g, "").slice(0, 8);
      if (v.length > 4) v = v.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
      searchBar.value = v;
    });
    searchButton.addEventListener("click", loadingDataHistorico);
    loadingDataHistorico();
  }
});
