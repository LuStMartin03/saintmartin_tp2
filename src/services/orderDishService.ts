import { PrismaClient } from '@prisma/client';
import { InternalServerError, BaseError } from '../errors/BaseError';

import { DishService } from '../services/dishService';
const dishService = new DishService();

const db = new PrismaClient();


export class OrderDishService {
    async getAllOrderDish() {
        try {
            const orderDish = await db.orderDish.findMany();
            return orderDish;
        } catch (error) {
                    console.error("Detalles del error:", error);
                    if (error instanceof BaseError) throw error;
                    throw new InternalServerError("Ocurrió un error inesperado al obtener pedidos-platos desde la base de datos.");
        }
    }

    async createOrderDish(dishes: number[], orderId: number) {
        try {
            const createdOrderDishes = [];

            for (let i = 0; i < dishes.length; i++) {
                const currentDishId = dishes[i];

                // cuanta repetidos
                let qty = 1;
                for (let j = i + 1; j < dishes.length; j++) {
                    if (dishes[j] === currentDishId) {
                        qty++;
                        // elimina duplicado
                        dishes.splice(j, 1);
                        j--; // reduce indice
                    }
                }

                await dishService.verifyDishExistence(currentDishId);

                const orderDish = await db.orderDish.create({
                    data: {
                        orderId,
                        dishId: currentDishId,
                        qty: qty
                    }
                });

                createdOrderDishes.push(orderDish);
            }

            return createdOrderDishes;
        } catch (error) {
                    console.error("Detalles del error:", error);
                    if (error instanceof BaseError) throw error;
                    throw new InternalServerError("Ocurrió un error inesperado al registrar los platos del pedido.");
        }
    }
}