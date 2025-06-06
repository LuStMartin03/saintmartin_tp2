import { Router } from 'express';
import { getAllOrders, deleteOrder, createOrder, changeStatus } from '../controllers/orderController';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/create', createOrder);
orderRouter.delete('/delete/:id', deleteOrder);
orderRouter.patch('/change_status', changeStatus);

export default orderRouter;