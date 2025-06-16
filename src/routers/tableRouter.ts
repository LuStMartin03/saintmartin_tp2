import { Router } from 'express';
import { disponibilityTables, changeStatus, createTable, deleteTable, getAllTables, bookTable } from '../controllers/tableController';
import { autenticarRol } from '../middleware/authMiddleware';

const tableRouter = Router();

tableRouter.get('/', autenticarRol('admin'), getAllTables);
tableRouter.get('/see_disponibility', autenticarRol('admin'), autenticarRol('client'), disponibilityTables);
tableRouter.post('/create', autenticarRol('admin'), createTable);
tableRouter.patch('/bookTable', autenticarRol('client'), bookTable);
tableRouter.patch('/change_status', autenticarRol('admin'), changeStatus);
tableRouter.delete('/delete/:id', autenticarRol('admin'), deleteTable);

export default tableRouter;