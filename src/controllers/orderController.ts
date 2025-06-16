import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

const orderService = new OrderService();

export async function getAllOrders(_req: Request, res: Response) {
    try {
        const admins = await orderService.getAllOrders();
        res.status(200).json({ ok: true, data: admins });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function createOrder(_req: Request, res: Response) {
    try {
        const orderRequested = _req.body;
        const order = await orderService.createOrder(orderRequested);
        res.status(200).json({ ok: true, data: order });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function deleteOrder(_req: Request, res: Response) {
    try {
        const orderRequested = parseInt(_req.params.id);
        const order = await orderService.deleteOrder(orderRequested);
        res.status(200).json({ ok: true, data: order });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function changeStatus(_req: Request, res: Response) {
    try {
        const orderIdRequested = _req.body.orderId;
        const orderStatusRequested = _req.body.status;
        const order = await orderService.changeStatus(orderIdRequested, orderStatusRequested);
        res.status(200).json({ ok: true, data: order });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function seeStatus(_req: Request, res: Response) {
    try {
        const orderIdRequested = parseInt(_req.params.id);
        const order = await orderService.seeStatus(orderIdRequested);
        res.status(200).json({ ok: true, data: order });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}