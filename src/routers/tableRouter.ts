import { Router } from 'express';
import { TableService } from '../services/tableService';


const tableRouter = Router();
const tableService = new TableService();

tableRouter.get('/', async (_req, res) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json({ ok: true, data: tables });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

tableRouter.post('/create', async (_req, res) => {
    try {
        const tableRequested = _req.body;
        const table = await tableService.createTable(tableRequested);
        res.status(200).json({ ok: true, data: table });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

tableRouter.post('/change_status', async (_req, res) => {
    try {
        const tableRequested = _req.body;
        const table = await tableService.changeTableStatus(tableRequested);
        res.status(200).json({ ok: true, data: table });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

tableRouter.delete('/:id', async (_req, res) => {
    try {
        const tableIdToGet = parseInt(_req.params.id);
        const table = await tableService.deleteTable(tableIdToGet);
        res.status(200).json({ ok: true, data: table });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default tableRouter;