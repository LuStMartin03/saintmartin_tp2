"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tableService_1 = require("../services/tableService");
const tableRouter = (0, express_1.Router)();
const tableService = new tableService_1.TableService();
tableRouter.get('/', async (_req, res) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json({ ok: true, data: tables });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});
tableRouter.post('/create', async (_req, res) => {
    try {
        const tableRequested = _req.body;
        const table = await tableService.createTable(tableRequested);
        res.status(200).json({ ok: true, data: table });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});
tableRouter.post('/change_status', async (_req, res) => {
    try {
        const tableRequested = _req.body;
        const table = await tableService.changeTableStatus(tableRequested);
        res.status(200).json({ ok: true, data: table });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});
tableRouter.delete('/:id', async (_req, res) => {
    try {
        const tableIdToGet = parseInt(_req.params.id);
        const table = await tableService.deleteTable(tableIdToGet);
        res.status(200).json({ ok: true, data: table });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});
exports.default = tableRouter;
