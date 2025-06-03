import jwt from 'jsonwebtoken';

const SECRET = 'miguelito´s_secret';

export function generarToken(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verificarToken(token: string): any {
    return jwt.verify(token, SECRET);
}
