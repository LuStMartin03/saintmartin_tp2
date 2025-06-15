import { Router } from 'express';
import { changePrice, createDish, deleteDish, getAllDishes } from '../controllers/dishController';
import { autenticarRol } from '../middleware/authMiddleware';

const dishRouter = Router();

dishRouter.get('/', getAllDishes);
dishRouter.post('/create', autenticarRol('admin'), createDish);
dishRouter.delete('/:id', autenticarRol('admin'), deleteDish);
dishRouter.patch('/change_price/:id', autenticarRol('admin'), changePrice);

export default dishRouter;