"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__dirname, '../../../bd.sqlite');
const db = new better_sqlite3_1.default(dbPath);
db.prepare(`
    CREATE TABLE IF NOT EXISTS clientes (
        clienteId INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL,
        telefono INTEGER NOT NULL,
        contraseña TEXT NOT NULL,
        direccionDeDomicilio TEXT NOT NULL
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS administradores (
        adminId INTEGER PRIMARY KEY AUTOINCREMENT,
        contraseña TEXT NOT NULL
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS platos (
        platoId INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        precio REAL NOT NULL,
        categoria TEXT NOT NULL
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS mesas (
        numeroDeMesa INTEGER PRIMARY KEY AUTOINCREMENT,
        estado TEXT NOT NULL
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS pedidos (
        numeroDePedido INTEGER PRIMARY KEY AUTOINCREMENT,
        clienteId INTEGER NOT NULL,
        montoTotal REAL NOT NULL,
        descuento REAL DEFAULT 0,
        domicilioDeEntrega TEXT NOT NULL,
        FOREIGN KEY (clienteId) REFERENCES clientes(clienteId)
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS pedido_plato (
        pedidoId INTEGER NOT NULL,
        platoId INTEGER NOT NULL,
        FOREIGN KEY (pedidoId) REFERENCES pedidos(numeroDePedido),
        FOREIGN KEY (platoId) REFERENCES platos(platoId)
    );
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS reservas (
        reservaId INTEGER PRIMARY KEY AUTOINCREMENT,
        numeroDeMesa INTEGER NOT NULL,
        clienteId INTEGER NOT NULL,
        fechaDeReserva DATETIME NOT NULL,
        FOREIGN KEY (numeroDeMesa) REFERENCES mesas(numeroDeMesa),
        FOREIGN KEY (clienteId) REFERENCES clientes(clienteId)
    );
`).run();
exports.default = db;
