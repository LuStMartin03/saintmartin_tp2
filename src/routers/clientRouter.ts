import { Router } from 'express';
import { ClientService } from '../services/clientService';

const clientRouter = Router();
const clientService = new ClientService();

clientRouter.get('/', async (_req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json({ ok: true, data: clients });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

clientRouter.post('/register', async (_req, res) => {
    try {
        const clientRequested = _req.body;
        const client = await clientService.createClient(clientRequested);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});


clientRouter.post('/login', async (_req, res) => {
    try {
        const clientEmailRequested = _req.body.email;
        const clientPasswordRequested = _req.body.password;
        const client = await clientService.loginClient(clientEmailRequested, clientPasswordRequested);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

clientRouter.delete('/:id', async (_req, res) => {
    try {
        const clientIdToGet = parseInt(_req.params.id);
        const client = await clientService.deleteClient(clientIdToGet);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});


clientRouter.patch('/change_password/:id', async (_req, res) => {
    try {
        const clientIdToGet = parseInt(_req.params.id);
        const clientData = _req.body;
        const client = await clientService.changePassword(clientIdToGet, clientData);
        res.status(200).json({ ok: true, data: client });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default clientRouter;