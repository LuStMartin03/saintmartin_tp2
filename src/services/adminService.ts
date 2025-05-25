import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.administrador.findMany(); // Asegurate que sea la tabla correcta
            return admins;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener administradores.");
        }
    }
}