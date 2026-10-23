package org.example;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DispositivoDAO {
    public void create(Dispositivo dispositivo) throws SQLException {
        String sql = "INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk) VALUES (?, ?, ?, ?)";

        try (java.sql.Connection connection = Connection.OpenDataBase();
             PreparedStatement command = connection.prepareStatement(sql)){
            command.setString(1, dispositivo.nome_dispositivo());
            command.setString(2, dispositivo.localizacao());
            command.setString(3, dispositivo.tipo_dispositivo());
            command.setInt(4, dispositivo.gateway_pai_fk());
            command.executeUpdate();
        }
    }
}