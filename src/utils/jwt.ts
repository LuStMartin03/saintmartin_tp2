import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'lo_de_miguel_clave';

interface JwtPayload {
    id: number;
    rol: string;
}

export function generateToken(payload: JwtPayload) {
    const opciones: SignOptions = { expiresIn: '15h'}
    return jwt.sign(payload, SECRET_KEY, opciones);
}


export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
