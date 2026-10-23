package org.example;

import java.sql.SQLException;
import java.time.LocalDateTime;

public class TestDAO {
    public static void main(String[] args) throws SQLException {
        AtuadorDAO atuadorDao = new AtuadorDAO();
        DispositivoDAO dispositivosDAO = new DispositivoDAO();
        RegistroDAO registrosDAO = new RegistroDAO();

        dispositivosDAO.create(new Dispositivo(1, "Sensor Refeitorio", "51,477928° 0,001545°", "Endpoint", 1));
        atuadorDao.create(new Atuador(0, 1,"Led 1", true,  LocalDateTime.now()));
        registrosDAO.create(new Registro(1L, 1, "1792152318", LocalDateTime.now(), 32, 93, 921.9F, 781, 72, 3.6F, 178, 52));
    }
}

