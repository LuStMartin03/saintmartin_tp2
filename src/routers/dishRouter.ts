import { Router } from 'express';
import { changePrice, createDish, deleteDish, getAllDishes } from '../controllers/dishController';
import { authenticateRol } from '../middleware/authMiddleware';

const dishRouter = Router();

dishRouter.get('/', getAllDishes);
dishRouter.post('/create', authenticateRol('admin'), createDish);
dishRouter.delete('/:id', authenticateRol('admin'), deleteDish);
dishRouter.patch('/change_price/:id', authenticateRol('admin'), changePrice);

export default dishRouter;