import { Router } from 'express';
import { changePassword, deleteClient, getAllClients, login, register } from '../controllers/clientController';

const clientRouter = Router();

clientRouter.get('/', getAllClients);
clientRouter.post('/register', register);
clientRouter.post('/login', login);
clientRouter.delete('/:id', deleteClient);
clientRouter.patch('/change_password', changePassword);

export default clientRouter;