package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DispositivosDAO {
    public void create(Dispositivos dispositivos) throws SQLException {
        String sql = "INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk) VALUES (?, ?, ?, ?)";

        try (Connection connection = Conexao.abrir();
        PreparedStatement command = connection.prepareStatement(sql)){
            command.setString(1, dispositivos.nome_dispositivo());
            command.setString(2, dispositivos.localizacao());
            command.setString(3, dispositivos.tipo_dispositivo());
            command.setInt(4, dispositivos.gateway_pai_fk());
            command.executeUpdate();
        }
    }
}