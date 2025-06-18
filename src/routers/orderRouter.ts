import { Router } from 'express';
import { getAllOrders, deleteOrder, createOrder, changeStatus, seeStatus } from '../controllers/orderController';
import { authenticateRol } from '../middleware/authMiddleware';

const orderRouter = Router();

orderRouter.get('/', authenticateRol('admin'), getAllOrders);
orderRouter.post('/create', authenticateRol('client'), createOrder);
orderRouter.delete('/delete/:id', authenticateRol('admin'), deleteOrder);
/* orderRouter.patch('/change_status', autenticarRol('admin'), changeStatus); */
orderRouter.patch('/see_status/:id', authenticateRol('anyUser'), seeStatus);

export default orderRouter;