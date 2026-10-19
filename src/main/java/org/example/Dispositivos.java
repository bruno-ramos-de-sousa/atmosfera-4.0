package org.example;

public record Dispositivos(
        int id_dispositivo,
        String nome_dispositivo,
        String localizacao,
        String tipo_dispositivo,
        int gateway_pai_fk
) {
    public String toJson() {
        return "{\"id_dispositivo\":" + id_dispositivo
                + ", \"nome_dispositivo\":\"" + escapar(nome_dispositivo) + "\""
                + ", \"localizacao\":\"" + escapar(localizacao) + "\""
                + ", \"tipo_dispositivo\":\"" + escapar(tipo_dispositivo) + "\""
                + ", \"gateway_pai_fk\":\"" + gateway_pai_fk +
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