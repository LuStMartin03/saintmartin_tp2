import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof BaseError) {
        res.status(err.statusCode).json({ ok: false, mensaje: err.message });
    } else {
        console.error('Error inesperado:', err);
        res.status(500).json({ ok: false, mensaje: 'Error interno del servidor.' });
    }
}
