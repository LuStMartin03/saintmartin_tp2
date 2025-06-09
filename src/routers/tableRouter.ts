import { Router } from 'express';
import { disponibilityTables, changeStatus, createTable, deleteTable, getAllTables } from '../controllers/tableController';

const tableRouter = Router();

tableRouter.get('/', getAllTables);
tableRouter.get('/see_disponibility', disponibilityTables);
tableRouter.post('/create', createTable);
tableRouter.patch('/change_status', changeStatus);
tableRouter.delete('/delete/:id', deleteTable);

export default tableRouter;