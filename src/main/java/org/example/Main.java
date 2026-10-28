package org.example;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws IOException, SQLException {
        testConnection();

        HttpServer server = HttpServer.create(
                new InetSocketAddress("0.0.0.0", 8080), 0);

        server.createContext("/", Main::loadPage);

        server.start();
    }

    private static void testConnection() throws SQLException {
        try (java.sql.Connection ignored = Connection.OpenDataBase()) {
            System.out.println("Banco conectado com sucesso!!!");
        }
    }

    private static void loadPage(HttpExchange exchange) throws IOException {
        if(!exchange.getRequestMethod().equals("GET")) {
            response(exchange, 405, "Metodo não permitido", "text/plain");
            return;
        }

        String path = exchange.getRequestURI().getPath();

        if (path.equals("/")) {
            path = "/index.html";
        }

        String resourcePath = "/public" + path;

        try (InputStream file = Main.class.getResourceAsStream(resourcePath)) {
            if (file == null) {
                response(exchange, 404, "Arquivo não encontrado", "text/plain");
                return;
            }

            String contentType = "text/plain";
            if (resourcePath.endsWith(".html")) {
                contentType = "text/html; charset=UTF-8";
            } else if (resourcePath.endsWith(".css")) {
                contentType = "text/css; charset=UTF-8";
            } else if (resourcePath.endsWith(".js")) {
                contentType = "application/javascript; charset=UTF-8";
            }

            byte[] bytes = file.readAllBytes();
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
            exchange.close();
        }
    }

    private static void response(HttpExchange exchange, int status, String content) throws IOException {
        response(exchange, status, content, "application/json");
    }

    private static void response(HttpExchange exchange, int status, String content, String type) throws IOException {
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