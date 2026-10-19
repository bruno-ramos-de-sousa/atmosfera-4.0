package org.example;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws IOException {

        HttpServer servidor = HttpServer.create(
                new InetSocketAddress("0.0.0.0", 8080), 0);

        servidor.createContext("/", Main::carregarPagina);

        servidor.start();
    }

    private static void testarConexao() throws SQLException {
        try (Connection igonored = Conexao.abrir()) {
            System.out.println("Banco conectado com sucesso!!!");
        }
    }

    private static void carregarPagina(HttpExchange exchange) throws IOException {
    }
}