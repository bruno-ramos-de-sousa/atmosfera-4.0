package org.example;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.List;

public class Main {
    private static final RegistroDAO registroDAO = new RegistroDAO();
    private static final DispositivoDAO dispositivoDAO = new DispositivoDAO();
    private static final AtuadorDAO atuadorDAO = new AtuadorDAO();
    public static void main(String[] args) throws IOException, SQLException {
        testConnection();

        HttpServer server = HttpServer.create(
                new InetSocketAddress("0.0.0.0", 8080), 0);

        server.createContext("/", Main::loadPage);
        server.createContext("/api/registros/diarios", Main::listenDailyRegistros);
        server.createContext("/api/dispositivos", Main::listenDispositivos);
        server.createContext("/api/atuadores", Main::listenAtuadores);

        server.start();
    }

    private static void setAccess(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
    }

    private static void listenDailyRegistros(HttpExchange exchange) throws IOException {
        setAccess(exchange);

        try {
            if (exchange.getRequestMethod().equals("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
            } else if (exchange.getRequestMethod().equals("GET")) {
                listDailyRegistros(exchange);
            } else {
                exchange.getRequestHeaders().set("Allow", "GET, OPTIONS");
                response(exchange, 405, "{\"erro\":\"Método não permitido\"}");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response(exchange, 500, "{\"erro\":\"Erro ao cessar o banco\"}");
        }
    }

    private static void listenDispositivos(HttpExchange exchange) throws IOException {
        setAccess(exchange);

        try {
            if (exchange.getRequestMethod().equals("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
            } else if (exchange.getRequestMethod().equals("GET")) {
                listDispositivos(exchange);
            } else {
                exchange.getRequestHeaders().set("Allow", "GET, OPTIONS");
                response(exchange, 405, "{\"erro\":\"Método não permitido\"}");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response(exchange, 500, "{\"erro\":\"Erro ao cessar o banco\"}");
        }
    }

    private static void listenAtuadores(HttpExchange exchange) throws IOException {
        setAccess(exchange);

        try {
            if (exchange.getRequestMethod().equals("OPTIONS")) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
            } else if (exchange.getRequestMethod().equals("GET")) {
                listAtuadores(exchange);
            } else {
                exchange.getRequestHeaders().set("Allow", "GET, OPTIONS");
                response(exchange, 405, "{\"erro\":\"Método não permitido\"}");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response(exchange, 500, "{\"erro\":\"Erro ao cessar o banco\"}");
        }
    }

    private static void listDailyRegistros(HttpExchange exchange) throws IOException, SQLException {
        List<Registro> registros = registroDAO.listDailyRegistros();
        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < registros.size(); i++) {
            if (i > 0) json.append(",");
            json.append(registros.get(i).toJson());
        }
        json.append("]");
        response(exchange, 200, json.toString());
    }

    private static void listDispositivos(HttpExchange exchange) throws IOException, SQLException {
        List<Dispositivo> dispositivos = dispositivoDAO.listDispositivos();
        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < dispositivos.size(); i++) {
            if (i > 0) json.append(",");
            json.append(dispositivos.get(i).toJson());
        }
        json.append("]");
        response(exchange, 200, json.toString());
    }

    private static void listAtuadores(HttpExchange exchange) throws IOException, SQLException {
        List<Atuador> atuadores = atuadorDAO.listAtuadores();
        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < atuadores.size(); i++) {
            if (i > 0) json.append(",");
            json.append(atuadores.get(i).toJson());
        }
        json.append("]");
        response(exchange, 200, json.toString());
    }

    private static void testConnection() throws SQLException {
        try (java.sql.Connection ignored = Connection.openDataBase()) {
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