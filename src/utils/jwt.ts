import jwt from 'jsonwebtoken';

const SECRET = 'lo_de_miguelito';

export function generarToken(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verificarToken(token: string): any {
    return jwt.verify(token, SECRET);
}
