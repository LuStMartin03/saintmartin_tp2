import { Router } from 'express';
import { AdminService } from '../services/adminService';

const adminRouter = Router();
const adminService = new AdminService();

adminRouter.get('/', async (_req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json({ ok: true, data: admins });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

adminRouter.post('/register', async (_req, res) => {
    try {
        const adminRequested = _req.body;
        const admin = await adminService.createAdmin(adminRequested);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});


adminRouter.post('/login', async (_req, res) => {
    try {
        const adminRequested = _req.body;
        const admin = await adminService.loginAdmin(adminRequested);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

adminRouter.delete('/:id', async (_req, res) => {
    try {
        const adminIdToGet = parseInt(_req.params.id);
        const admin = await adminService.deleteAdmin(adminIdToGet);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});


adminRouter.patch('/change_password/:id', async (_req, res) => {
    try {
        const adminIdToGet = parseInt(_req.params.id);
        const adminData = _req.body;
        const admin = await adminService.changePassword(adminIdToGet, adminData);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default adminRouter;