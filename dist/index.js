"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter_1 = __importDefault(require("./routers/adminRouter"));
const clientRouter_1 = __importDefault(require("./routers/clientRouter"));
const tableRouter_1 = __importDefault(require("./routers/tableRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('API - Restaurante “Lo de Miguel”');
});
app.use('/admin', adminRouter_1.default);
app.use('/client', clientRouter_1.default);
app.use('/table', tableRouter_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
