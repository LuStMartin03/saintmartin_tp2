import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

interface JwtPayload {
    id: number;
    rol: string;
}

export function generateToken(payload: JwtPayload) {
    const opciones: SignOptions = { expiresIn: '15m'}
    return jwt.sign(payload, SECRET_KEY, opciones);
}


export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
