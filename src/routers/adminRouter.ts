import { Router } from 'express';
import { getAllAdmins, login, register, deleteAdmin } from '../controllers/adminController';
import { authenticateRol } from '../middleware/authMiddleware';

const adminRouter = Router();

adminRouter.get('/', authenticateRol('admin'), getAllAdmins);
adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.delete('/:id', authenticateRol('admin'), deleteAdmin);

export default adminRouter;
