import { Router } from 'express';
import { getAllAdmins, login, register, deleteAdmin } from '../controllers/adminController';
import { authenticateRol } from '../middleware/authMiddleware';

const adminRouter = Router();

adminRouter.get('/', authenticateRol('admin'), getAllAdmins);
adminRouter.post('/register', register);
adminRouter.post('/login', login);

// VERIFICAR QUE EL ADMIN QUE ESTA CAMBIANDO ESTE SE EL ID CORRECTO
adminRouter.delete('/:id', authenticateRol('admin'), deleteAdmin);

export default adminRouter;
