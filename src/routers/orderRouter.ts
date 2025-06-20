import { Router } from 'express';
import { getAllOrders, deleteOrder, createOrder, seeStatus, changeStatus } from '../controllers/orderController';
import { authenticateRol } from '../middleware/authMiddleware';

const orderRouter = Router();

orderRouter.get('/', authenticateRol('admin'), getAllOrders);
orderRouter.get('/seeStatus/:id', authenticateRol('anyUser'), seeStatus);
orderRouter.post('/createOrder', authenticateRol('client'), createOrder);
orderRouter.delete('/:id', authenticateRol('admin'), deleteOrder);
orderRouter.patch('/changeStatus', authenticateRol('admin'), changeStatus);

export default orderRouter;