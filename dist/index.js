"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_routers_1 = __importDefault(require("./routers/usuario_routers"));
const platos_routers_1 = __importDefault(require("./routers/platos_routers"));
const pedidos_routers_1 = __importDefault(require("./routers/pedidos_routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('API del restaurante funcionando');
});
app.use('/usuarios', usuario_routers_1.default);
app.use('/platos', platos_routers_1.default);
app.use('/pedidos', pedidos_routers_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
