package org.example;

import java.time.LocalDateTime;

public record Registros (
        Long id_registro,
        int id_dispositivo_fk,
        String time_stamp,
        LocalDateTime data_hora,
        float temperatura,
        float umidade,
        float pressao,
        float altitude,
        float luminosidade,
        float velocidade_vento,
        int direcao_vento,
        int intensidade_wifi

) {
    public String toJson() {
        return "{\"id_registro\":" + id_registro
                + ", \"id_dispositivo_fk\":\"" + id_dispositivo_fk + "\""
                + ", \"time_stamp\":\"" + escapar(time_stamp) + "\""
                + ", \"data_hora\":\"" + data_hora + "\""
                + ", \"temperatura\":\"" + temperatura + "\""
                + ", \"umidade\":\"" + umidade + "\""
                + ", \"pressao\":\"" + pressao + "\""
                + ", \"altitude\":\"" + altitude + "\""
                + ", \"luminosidade\":\"" + luminosidade + "\""
                + ", \"velocidade_vento\":\"" + velocidade_vento + "\""
                + ", \"direcao_vento\":\"" + direcao_vento + "\""
                + ", \"intensidade_wifi\":\"" + intensidade_wifi +
                "}";
    }

    private String escapar(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "")
                .replace("\n", "\\n");
    }
}