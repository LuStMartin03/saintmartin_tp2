import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../../bd.sqlite');
const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS platos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        categoria TEXT NOT NULL,
        precio REAL NOT NULL
    );
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numeroDePedido TEXT NOT NULL,
        clienteId INTEGER NOT NULL,
        montoTotal REAL NOT NULL,
        descuento REAL DEFAULT 0,
        domicilioDeEntrega TEXT NOT NULL
    );
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS pedido_plato (
        pedidoId INTEGER NOT NULL,
        platoId INTEGER NOT NULL,
        FOREIGN KEY (pedidoId) REFERENCES pedido(id),
        FOREIGN KEY (platoId) REFERENCES platos(id)
    );
`).run();

export default db;
