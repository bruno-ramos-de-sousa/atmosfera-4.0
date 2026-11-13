document.addEventListener("loadedScreen", (e) => {
  if (e.detail.screenName === "historico") {
    const searchBar = document.getElementById("search-bar");

    async function loadingDataHistorico() {
      try {
        const date = searchBar.value.trim() + "T00:00:00";

        const dateSearch = await fetch(
          `/api/registros/${encodeURIComponent(date)}`,
        );
        const dados = await dateSearch.json();
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

          const tr = document.createElement("tr");
          tr.innerHTML = `
        <td>${item.nome_dispositivo}</td>
        <td>${formattedDate}</td>
        <td class="${tempClass}">${item.temperatura.toFixed(1).replace(".", ",")}°C</td>
        <td>${item.umidade}%</td>
        <td>${item.pressao} hPa</td>
        <td>${item.altitude} m</td>
        <td>${item.luminosidade}%</td>
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

    searchBar.addEventListener("blur", () => {
      loadingDataHistorico();
      let date = searchBar.value.split("-");
      if (date) {
        searchBar.type = "text";
        searchBar.value = date.length > 1 ? `${date[2]}/${date[1]}/${date[0]}` : "";
      }
    });

    searchBar.addEventListener("focus", () => {
      searchBar.type = "date";
    });
  }
});
