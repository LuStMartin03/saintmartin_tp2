"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./bd/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('API del restaurante funcionando');
});
// Endpoint de ejemplo
app.get('/platos', (req, res) => {
    try {
        const platos = connection_1.default.prepare('SELECT * FROM platos').all();
        res.json(platos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
