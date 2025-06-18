import { Router } from 'express';
import { getAllAdmins, login, register, deleteAdmin } from '../controllers/adminController';
import { autenticarRol } from '../middleware/authMiddleware';

const adminRouter = Router();

adminRouter.get('/', autenticarRol('admin'), getAllAdmins);
adminRouter.post('/register', register);
adminRouter.post('/login', login);

// VERIFICAR QUE EL ADMIN QUE ESTA CAMBIANDO ESTE SE EL ID CORRECTO
adminRouter.delete('/:id', autenticarRol('admin'), deleteAdmin);

export default adminRouter;
