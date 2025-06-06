import { Router } from 'express';
import { changePrice, createDish, deleteDish, getAllDishes } from '../controllers/dishController';

const dishRouter = Router();

dishRouter.get('/', getAllDishes);
dishRouter.post('/create', createDish);
dishRouter.delete('/:id', deleteDish);
dishRouter.patch('/change_price/:id', changePrice);

export default dishRouter;