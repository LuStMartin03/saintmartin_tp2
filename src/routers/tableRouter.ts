import { Router } from 'express';
import { changeStatus, createTable, deleteTable, getAllTables } from '../controllers/tableController';

const tableRouter = Router();

tableRouter.get('/', getAllTables);
tableRouter.post('/create', createTable);
tableRouter.patch('/change_status', changeStatus);
tableRouter.delete('/:id', deleteTable);

export default tableRouter;