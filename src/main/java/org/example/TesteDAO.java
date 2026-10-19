package org.example;

import java.sql.SQLException;
import java.time.LocalDateTime;

public class TesteDAO {
    public static void main(String[] args) throws SQLException {
        AtuadorDAO dao = new AtuadorDAO();

        dao.cadastrarAtuador(new Atuador(0, 1,"kaiky", true,  LocalDateTime.now()));
    }
}

