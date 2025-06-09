import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

const adminService = new AdminService();

export async function getAllAdmins(_req: Request, res: Response) {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json({ ok: true, data: admins });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function register(_req: Request, res: Response) {
    try {
        const adminRequested = _req.body;
        const admin = await adminService.createAdmin(adminRequested);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function login(_req: Request, res: Response) {
    try {        
        const emailRequested = _req.body.email;
        const passwordRequested = _req.body.password;
        const admin = await adminService.loginAdmin(emailRequested, passwordRequested);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function deleteAdmin(_req: Request, res: Response) {
    try {
        const adminIdToGet = parseInt(_req.params.id);
        const admin = await adminService.deleteAdmin(adminIdToGet);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function changePassword(_req: Request, res: Response) {
    try {
        const adminData = _req.body;
        const admin = await adminService.changePassword(adminData);
        res.status(200).json({ ok: true, data: admin });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}