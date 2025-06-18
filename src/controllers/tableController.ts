import { Request, Response } from 'express';
import { TableService } from '../services/tableService';

const tableService = new TableService();

export async function getAllTables(_req: Request, res: Response) {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json({ ok: true, data: tables });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function createTable(_req: Request, res: Response) {
    try {
        const tableRequested = _req.body;
        const table = await tableService.createTable(tableRequested);
        res.status(200).json({ ok: true, data: table });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function deleteTable(_req: Request, res: Response) {
    try {
        const tableIdToGet = parseInt(_req.params.id);
        const table = await tableService.deleteTable(tableIdToGet);
        res.status(200).json({ ok: true, data: table });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function disponibilityTables(_req: Request, res: Response) {
    try {
        const disponibility = await tableService.disponibility();
        res.status(200).json({ ok: true, data: disponibility });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}