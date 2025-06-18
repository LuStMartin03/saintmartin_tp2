import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ForbiddenError, UnauthorizedError } from '../errors/BaseError';

export function authenticateRol(rolPermitido: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedError('Token no proporcionado.');
        }

        const token = authHeader.split(' ')[1]; // formato esperado: Bearer <token>
        const payload = verifyToken(token);

        if (!payload) {
            throw new ForbiddenError('Token inválido o expirado.');
        }

        if (rolPermitido != "anyUser") {
            if ((payload as any).rol !== rolPermitido) {
            throw new ForbiddenError('No tenes permisos suficientes.');
            }
        }

        (req as any).usuario = payload;
        next();
    };
}
