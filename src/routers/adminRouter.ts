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

export default adminRouter;