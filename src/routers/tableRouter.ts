import { Router } from 'express';
import { disponibilityTables, createTable, deleteTable, getAllTables } from '../controllers/tableController';
import { authenticateRol } from '../middleware/authMiddleware';

const tableRouter = Router();

tableRouter.get('/', authenticateRol('admin'), getAllTables);
tableRouter.get('/disponibility', authenticateRol('anyUser'), disponibilityTables);
tableRouter.post('/create', authenticateRol('admin'), createTable);
tableRouter.delete('/:id', authenticateRol('admin'), deleteTable);

export default tableRouter;