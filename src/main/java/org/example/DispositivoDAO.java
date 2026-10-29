package org.example;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DispositivoDAO {
    public void create(Dispositivo dispositivo) throws SQLException {
        String sql = "INSERT INTO dispositivos (nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk) VALUES (?, ?, ?, ?)";

        try (java.sql.Connection connection = Connection.openDataBase();
             PreparedStatement command = connection.prepareStatement(sql)){
            command.setString(1, dispositivo.nome_dispositivo());
            command.setString(2, dispositivo.localizacao());
            command.setString(3, dispositivo.tipo_dispositivo());
            command.setInt(4, dispositivo.gateway_pai_fk());
            command.executeUpdate();
        }
    }

    public List<Dispositivo> listDispositivos() throws SQLException {
        String sql = "SELECT id_dispositivo, nome_dispositivo, localizacao, tipo_dispositivo, gateway_pai_fk FROM dispositivos;";
        List<Dispositivo> dispositivos = new ArrayList<>();

        try (java.sql.Connection connection = Connection.openDataBase();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet resultado = pstmt.executeQuery()) {

            while (resultado.next()) {
                Dispositivo dispositivo = new Dispositivo(
                        resultado.getInt("id_dispositivo"),
                        resultado.getString("nome_dispositivo"),
                        resultado.getString("localizacao"),
                        resultado.getString("tipo_dispositivo"),
                        resultado.getInt("gateway_pai_fk")
                );
                dispositivos.add(dispositivo);
            }
        }
        return dispositivos;
}
}