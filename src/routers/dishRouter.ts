import { Router } from 'express';
import { changePrice, createDish, deleteDish, getAllDishes } from '../controllers/dishController';
import { authenticateRol } from '../middleware/authMiddleware';

const dishRouter = Router();

dishRouter.get('/', getAllDishes); // cualquiera puede ver cliente, admin y no logeados
dishRouter.post('/createDish', authenticateRol('admin'), createDish);
dishRouter.patch('/changePrice/:id', authenticateRol('admin'), changePrice);
dishRouter.delete('/:id', authenticateRol('admin'), deleteDish);

export default dishRouter;