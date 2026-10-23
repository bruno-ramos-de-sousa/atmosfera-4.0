package org.example;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class RegistroDAO {
    public void create(Registro registro) throws SQLException {
        String sql = "INSERT INTO registros (id_dispositivo_fk, time_stamp, data_hora, temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (java.sql.Connection connection = Connection.OpenDataBase();
             PreparedStatement command = connection.prepareStatement(sql)) {
            command.setInt(1, registro.id_dispositivo_fk());
            command.setString(2, registro.time_stamp());
            command.setObject(3, (LocalDateTime) registro.data_hora());
            command.setFloat(4, registro.temperatura());
            command.setFloat(5, registro.umidade());
            command.setFloat(6, registro.pressao());
            command.setFloat(7, registro.altitude());
            command.setFloat(8, registro.luminosidade());
            command.setFloat(9, registro.velocidade_vento());
            command.setInt(10, registro.direcao_vento());
            command.setInt(11, registro.intensidade_wifi());
            command.executeUpdate();
        }
    }

    public List<Registro> listRegistros() throws SQLException {
        String sql = "SELECT id_registro, id_dispositivo_fk, time_stamp, data_hora, temperatura, umidade, pressao, altitude, luminosidade, velocidade_vento, direcao_vento, intensidade_wifi FROM registros ORDER BY id_registros";
        List<Registro> listaRegistro = new ArrayList<>();

        try (java.sql.Connection connection = Connection.OpenDataBase();
             PreparedStatement command = connection.prepareStatement(sql);
             ResultSet result = command.executeQuery()) {

            while (result.next()) {
                Registro registros = new Registro(
                        result.getLong("id_registro"),
                        result.getInt("id_dispositivo_fk"),
                        result.getString("time_stamp"),
                        (LocalDateTime) result.getObject("data_hora"),
                        result.getFloat("temperatura"),
                        result.getFloat("umidade"),
                        result.getFloat("pressao"),
                        result.getFloat("altitude"),
                        result.getFloat("luminosidade"),
                        result.getFloat("velocidade_vento"),
                        result.getInt("direcao_vento"),
                        result.getInt("intensidade_wifi")
                );
                listaRegistro.add(registros);
            }
        }
        return listaRegistro;
    }
}