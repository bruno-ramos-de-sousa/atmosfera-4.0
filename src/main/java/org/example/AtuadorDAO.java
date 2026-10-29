package org.example;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AtuadorDAO {
    public void create(Atuador atuador) throws SQLException {
        String sql = "INSERT INTO atuadores (id_dispositivo_fk, nome_atuador, status_atual, ultimo_comando) VALUES (?, ?, ?, ?)";

        try (java.sql.Connection connection = Connection.openDataBase();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, atuador.id_dispositivo_fk());
            pstmt.setString(2, atuador.nome_atuador());
            pstmt.setBoolean(3, atuador.status_atual());
            pstmt.setObject(4, (LocalDateTime) atuador.ultimo_comando());
            pstmt.executeUpdate();
        }
    }

    public List<Atuador> listAtuadores() throws SQLException {
        String sql = "SELECT id_atuador, id_dispositivo_fk, nome_atuador, status_atual, ultimo_comando FROM atuadores ORDER BY id_atuador DESC";
        List<Atuador> atuadores = new ArrayList<>();

        try (java.sql.Connection connection = Connection.openDataBase();
             PreparedStatement pstmt = connection.prepareStatement(sql);
             ResultSet resultSet = pstmt.executeQuery()) {

            while (resultSet.next()) {
                Atuador atuador = new Atuador(
                        resultSet.getInt("id_atuador"),
                        resultSet.getInt("id_dispositivo_fk"),
                        resultSet.getString("nome_atuador"),
                        resultSet.getBoolean("status_atual"),
                        (LocalDateTime) resultSet.getObject("ultimo_comando"));
                atuadores.add(atuador);
            }
        }
        return atuadores;
    }
}
