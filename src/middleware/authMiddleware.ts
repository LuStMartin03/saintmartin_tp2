import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwt';
import { ForbiddenError, UnauthorizedError } from '../errors/BaseError';

export function autenticarRol(rolPermitido: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedError('Token no proporcionado.');
        }

        const token = authHeader.split(' ')[1]; // Formato esperado: Bearer <token>
        const payload = verificarToken(token);

        if (!payload) {
            throw new ForbiddenError('Token inválido o expirado.');
        }

        if ((payload as any).rol !== rolPermitido) {
            throw new ForbiddenError('No tenes permisos suficientes.');
        }

        (req as any).usuario = payload;
        next();
    };
}
