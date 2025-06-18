import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';

const clientService = new ClientService();

export async function getAllClients(_req: Request, res: Response) {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json({ ok: true, data: clients });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function register(_req: Request, res: Response) {
    try {
        const clientRequested = _req.body;
        const client = await clientService.createClient(clientRequested);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function login(_req: Request, res: Response) {
    try {
        const clientEmailRequested = _req.body.email;
        const clientPasswordRequested = _req.body.password;
        const client = await clientService.loginClient(clientEmailRequested, clientPasswordRequested);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function deleteClient(_req: Request, res: Response) {
    try {
        const clientIdToGet = parseInt(_req.params.id);
        const client = await clientService.deleteClient(clientIdToGet);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}
