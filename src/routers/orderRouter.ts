import { Router } from 'express';
import { getAllOrders, deleteOrder, createOrder, changeStatus } from '../controllers/orderController';
import { autenticarRol } from '../middleware/authMiddleware';

const orderRouter = Router();

orderRouter.get('/', autenticarRol('admin'), getAllOrders);
orderRouter.post('/create', autenticarRol('client'), createOrder);
orderRouter.delete('/delete/:id', autenticarRol('admin'), deleteOrder);
orderRouter.patch('/change_status', autenticarRol('admin'), changeStatus);

export default orderRouter;