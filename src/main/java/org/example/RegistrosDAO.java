package org.example;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RegistrosDAO {
    public void create(Registros registros) throws SQLException {
        String sql = "INSERT INTO registros (id_dispositivo_fk, time_stamp, data_hora, temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi) VALUES (?, ?, ?, ?)";

        try (Connection connection = Conexao.abrir();
             PreparedStatement command = connection.prepareStatement(sql)) {
            command.setInt(1, registros.id_dispositivo_fk());
            command.setString(2, registros.time_stamp());
            command.setObject(3, registros.data_hora());
            command.setFloat(4, registros.temperatura());
            command.setFloat(5, registros.umidade());
            command.setFloat(6, registros.pressao());
            command.setFloat(7, registros.altitude());
            command.setFloat(8, registros.luminosidade());
            command.setFloat(9, registros.velocidade_vento());
            command.setInt(10, registros.direcao_vento());
            command.setInt(11, registros.intensidade_wifi());
            command.executeUpdate();
        }
    }

    public List<Registros> listarRegistros() throws SQLException {
        String sql = "SELECT id_registro, id_dispositivo_fk, time_stamp, data_hora, temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi FROM registros ORDER BY id_registros";
        List<Registros> registro1 = new ArrayList<>();

        try (Connection connection = Conexao.abrir();
             PreparedStatement command = connection.prepareStatement(sql);
             ResultSet result = command.executeQuery()) {

            while (result.next()) {
                Registros registros = new Registros(
                        result.getLong("id_registro"),
                        result.getInt("id_dispositivo_fk"),
                        result.getString("time_stamp"),
                        result.getObject("data_hora"),
                        result.getFloat("temperatura"),
                        result.getFloat("umidade"),
                        result.getFloat("pressao"),
                        result.getFloat("altitude"),
                        result.getFloat("luminosidade"),
                        result.getFloat("velocidade_vento"),
                        result.getInt("direcao_vento"),
                        result.getInt("intensidade_wifi")
                );
                registro1.add(registros);
            }
        }
        return registro1;
    }
}