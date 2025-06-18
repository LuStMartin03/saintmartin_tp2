import { Router } from 'express';
import { deleteClient, getAllClients, login, register } from '../controllers/clientController';
import { authenticateRol } from '../middleware/authMiddleware';

const clientRouter = Router();

clientRouter.get('/', authenticateRol('admin'), getAllClients);
clientRouter.post('/register', register);
clientRouter.post('/login', login);
clientRouter.delete('/:id', authenticateRol('anyUser'),  deleteClient);

export default clientRouter;