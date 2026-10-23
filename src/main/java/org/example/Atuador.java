package org.example;

import java.time.LocalDateTime;

public record Atuador(
    int id_atuador,
    int id_dispositivo_fk,
    String nome_atuador,
    boolean status_atual,
    LocalDateTime ultimo_comando
) {

    public String toJson() {
        return "{\"id_atuador\":" + id_atuador +
                ", \"id_dispositivo_fk\":\"" + id_dispositivo_fk + "\"" +
                "\"nome_atuador\":\"" + escape(nome_atuador) + "\"" +
                "\"status_atual\":\"" + status_atual + "\"" +
                "\"ultimo_comando\":\"" + ultimo_comando + "\"}";
    }

    public String escape(String texto) {
        return texto.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "")
                .replace("\n", "\\n");
    }
}
