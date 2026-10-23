package org.example;

public record Dispositivo(
        int id_dispositivo,
        String nome_dispositivo,
        String localizacao,
        String tipo_dispositivo,
        int gateway_pai_fk
) {
    public String toJson() {
        return "{\"id_dispositivo\":" + id_dispositivo
                + ", \"nome_dispositivo\":\"" + escape(nome_dispositivo) + "\""
                + ", \"localizacao\":\"" + escape(localizacao) + "\""
                + ", \"tipo_dispositivo\":\"" + escape(tipo_dispositivo) + "\""
                + ", \"gateway_pai_fk\":\"" + gateway_pai_fk +
                "}";
    }

    private String escape(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "")
                .replace("\n", "\\n");
    }
}