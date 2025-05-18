"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
// Ruta absoluta al archivo bd.sqlite
const dbPath = path_1.default.resolve(__dirname, '../../../bd.sqlite');
const db = new better_sqlite3_1.default(dbPath);
db.prepare(`
    CREATE TABLE IF NOT EXISTS platos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL
    );
`).run();
// Exportás la conexión para que otros archivos la usen
exports.default = db;
