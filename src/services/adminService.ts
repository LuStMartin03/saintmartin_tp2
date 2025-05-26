import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.administrador.findMany();
            return admins;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener administradores.");
        }
    }
}