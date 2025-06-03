import { Router } from 'express';
import { DishService } from '../services/dishService';
import { changePrice, createDish, deleteDish, getAllDishes } from '../controllers/dishController';
import { verificarToken } from '../utils/jwt';
import { soloAdmin } from '../middleware/auth';

const dishRouter = Router();

dishRouter.get('/', getAllDishes);
dishRouter.post('/create', createDish);
dishRouter.delete('/:id', deleteDish);
dishRouter.patch('/change_price/:id', changePrice);

export default dishRouter;