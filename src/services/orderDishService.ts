import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();


export class OrderDishService {
    async getAllOrderDish() {
        try {
            const orderDish = await db.orderDish.findMany();
            return orderDish;
        } catch (error) {
            console.error("Error al obtener ordenes desde la base de datos:", error);
            throw new Error("No se pudieron obtener los ordenes.");
        }
    }
}