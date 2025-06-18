import { Router } from 'express';
import { deleteClient, getAllClients, login, register } from '../controllers/clientController';
import { autenticarRol } from '../middleware/authMiddleware';

const clientRouter = Router();

clientRouter.get('/', autenticarRol('admin'), getAllClients);
clientRouter.post('/register', register);
clientRouter.post('/login', login);
clientRouter.delete('/:id', autenticarRol('admin'), autenticarRol('client'), deleteClient);

export default clientRouter;