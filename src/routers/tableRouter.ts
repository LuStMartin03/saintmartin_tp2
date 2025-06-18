import { Router } from 'express';
import { disponibilityTables, changeStatus, createTable, deleteTable, getAllTables, bookTable } from '../controllers/tableController';
import { authenticateRol } from '../middleware/authMiddleware';

const tableRouter = Router();

tableRouter.get('/', authenticateRol('admin'), getAllTables);
tableRouter.get('/see_disponibility', authenticateRol('anyUser'), disponibilityTables);
tableRouter.post('/create', authenticateRol('admin'), createTable);
tableRouter.patch('/bookTable', authenticateRol('client'), bookTable);
tableRouter.patch('/change_status', authenticateRol('admin'), changeStatus);
tableRouter.delete('/delete/:id', authenticateRol('admin'), deleteTable);

export default tableRouter;