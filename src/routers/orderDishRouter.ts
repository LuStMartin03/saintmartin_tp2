import { Router, Request, Response } from 'express';
import { OrderDishService } from '../services/orderDishService';

const orderDishRouter = Router();
const orderService = new OrderDishService();

orderDishRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const orderDish = await orderService.getAllOrderDish();
        res.status(200).json({ ok: true, data: orderDish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

export default orderDishRouter;
