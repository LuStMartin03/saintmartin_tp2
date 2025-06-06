import jwt from 'jsonwebtoken';

const SECRET = 'miguelito´s_secret';

export function generateToken(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET);
}
