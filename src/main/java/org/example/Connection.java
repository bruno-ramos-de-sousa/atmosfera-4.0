package org.example;

import java.sql.DriverManager;
import java.sql.SQLException;

public class Connection {
    private static final String URL = "jdbc:mysql://localhost:3306/atmosfera_4";
    private static final String USER = "root";
    private static final String PASSWORD = "senaisp";

    public static java.sql.Connection openDataBase() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
