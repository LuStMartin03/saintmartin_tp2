import { Router } from 'express';
import { DishService } from '../services/dishService';

const dishRouter = Router();
const dishService = new DishService();

dishRouter.get('/', async (_req, res) => {
    try {
        const dishes = await dishService.getAllDishes();
        res.status(200).json({ ok: true, data: dishes });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

dishRouter.post('/create', async (_req, res) => {
    try {
        const dishRequested = _req.body;
        const dish = await dishService.createDish(dishRequested);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

dishRouter.delete('/:id', async (_req, res) => {
    try {
        const dishIdToGet = parseInt(_req.params.id);
        const dish = await dishService.deleteDish(dishIdToGet);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

dishRouter.patch('/change_price/:id', async (_req, res) => {
    try {
        const dishIdToGet = parseInt(_req.params.id);
        const dishPriceRequested = _req.body.price;
        const dish = await dishService.changeDishPrice(dishIdToGet, dishPriceRequested);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
});


export default dishRouter;