import { Router } from 'express';
import { getAllAdmins, login, register, deleteAdmin, changePassword } from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/', getAllAdmins);
adminRouter.post('/register', register);
adminRouter.post('/login', login);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.patch('/change_password/:id', changePassword);

export default adminRouter;