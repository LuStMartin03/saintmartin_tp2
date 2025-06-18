import { Router, Request, Response } from 'express';
import { OrderDishService } from '../services/orderDishService';
import { authenticateRol } from '../middleware/authMiddleware';

const orderDishRouter = Router();
const orderService = new OrderDishService();

orderDishRouter.get('/', authenticateRol('admin'), async (_req: Request, res: Response) => {
    try {
        const orderDish = await orderService.getAllOrderDish();
        res.status(200).json({ ok: true, data: orderDish });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
});

export default orderDishRouter;
