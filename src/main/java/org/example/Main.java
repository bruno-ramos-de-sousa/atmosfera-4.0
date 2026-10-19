package org.example;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
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

    private static void response(HttpExchange exchange, int status, String content) throws IOException {
        response(exchange, status, content, "application/json");
    }

    private static void response (HttpExchange exchange, int status, String content, String type) throws IOException {
        byte[] responseContent = content.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", type + "; charset=UTF-8");
        exchange.sendResponseHeaders(status, responseContent.length);
        exchange.getResponseBody().write(responseContent);
        exchange.close();
    }

    private static void response(HttpExchange exchange, int status) throws IOException{
        response(exchange, status);
    }
}