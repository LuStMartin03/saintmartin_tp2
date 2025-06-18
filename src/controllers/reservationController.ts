import { Request, Response } from 'express';
import { ReservationService } from '../services/reservationService';

const reservationService = new ReservationService();

export async function getAllReservations(_req: Request, res: Response) {
    try {
        const reservations = await reservationService.getAllReservations();
        res.status(200).json({ ok: true, data: reservations });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function createReservation(_req: Request, res: Response) {
    try {
        const reservationRequested = _req.body;
        const reservation = await reservationService.createReservation(reservationRequested);
        res.status(200).json({ ok: true, data: reservation });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}

export async function deleteReservation(_req: Request, res: Response) {
    try {
        const reservationIdToGet = parseInt(_req.params.id);
        const reservation = await reservationService.deleteReservation(reservationIdToGet);
        res.status(200).json({ ok: true, data: reservation });
    } catch (error: any) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ ok: false, error: error.message });
    }
}
