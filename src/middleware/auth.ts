import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'miguelito´s_secret';

export function autenticar(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ mensaje: 'Falta token' });

    const token = authHeader.split(' ')[1];

    try {
        const usuario = jwt.verify(token, SECRET);
        (req as any).usuario = usuario;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
}

export function soloAdmin(req: Request, res: Response, next: NextFunction) {
    const usuario = (req as any).usuario;
    if (usuario?.rol !== 'admin') return res.status(403).json({ mensaje: 'Acceso denegado' });
    next();
}

export function soloCliente(req: Request, res: Response, next: NextFunction) {
    const usuario = (req as any).usuario;
    if (usuario?.rol !== 'cliente') return res.status(403).json({ mensaje: 'Solo clientes pueden acceder' });
    next();
}
