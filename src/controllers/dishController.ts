import { Request, Response } from 'express';
import { DishService } from '../services/dishService';

const dishService = new DishService();

export async function getAllDishes(_req: Request, res: Response) {
    try {
        const dishes = await dishService.getAllDishes();
        res.status(200).json({ ok: true, data: dishes });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function createDish(_req: Request, res: Response) {
    try {
        const dishRequested = _req.body;
        const dish = await dishService.createDish(dishRequested);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function deleteDish(_req: Request, res: Response) {
    try {
        const dishIdToGet = parseInt(_req.params.id);
        const dish = await dishService.deleteDish(dishIdToGet);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}

export async function changePrice(_req: Request, res: Response) {
    try {
        const dishIdToGet = parseInt(_req.params.id);
        const dishPriceRequested = _req.body.price;
        const dish = await dishService.changeDishPrice(dishIdToGet, dishPriceRequested);
        res.status(200).json({ ok: true, data: dish });
    } catch (error: any) {
        res.status(500).json({ ok: false, error: error.message });
    }
}