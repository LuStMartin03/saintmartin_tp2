import { PrismaClient } from '@prisma/client';

import { ClientService } from '../services/clientService';
import { DishService } from '../services/dishService';

const clientService = new ClientService();
const dishService = new DishService();

const db = new PrismaClient();

/*
    orderId           Int     @id @default(autoincrement())
    clientId          Int
    totalAmount       Float
    discount          Float   @default(0)
    status            String  @default("en proceso")
    deliveryAddress   String
*/

interface orderData {
    clientId: number,
    totalAmount: number,
    discount: number,
    status: string,
    dishes: number[]
}

export class OrderService {
    async getAllOrders() {
        try {
            const orders = await db.order.findMany();
            return orders;
        } catch (error) {
            console.error("Error al obtener ordenes desde la base de datos:", error);
            throw new Error("No se pudieron obtener los ordenes.");
        }
    }

    async createOrder(body: orderData) {
        try {
            await clientService.verifyClientExists(body.clientId)
            const address = await clientService.clientAddress(body.clientId)

            for (let i = 0; i < body.dishes.length; i++) {
                await dishService.verifyDishExists(body.dishes[i])
            }

            const newOrder = await db.order.create({
                data: {
                    clientId: body.clientId,
                    totalAmount: body.totalAmount,
                    discount: body.discount,
                    status: body.status,
                    deliveryAddress: address
                }
            });

            for (let i = 0; i < body.dishes.length; i++) {
                await dishService.verifyDishExists(body.dishes[i])
                await db.orderDish.create({
                data: {
                    orderId: newOrder.orderId,
                    dishId: body.dishes[i]
                }
                });
            }
            return newOrder;

        } catch (error) {
            console.error("Error al crear orden con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear la orden.");
        }
    }

    async deleteOrder(id: number) {
        try {
            const order = await db.order.findFirst({
                where: { orderId: id },
            });

            if (!order) {
                throw new Error(`No se encontró ninguna orden con ID: ${id}`);
            }

            const deletedOrder = await db.order.delete({
                where: { orderId: id },
            });

            return deletedOrder;

        } catch (error) {
            console.error(`Error al intentar eliminar la orden con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar la orden con ID ${id}.`);
        }
    }

    async changeStatus(id: number, status: string) {
        try {
            const order = await db.order.findFirst({
                where: { orderId: id },
            });

            if (!order) {
                throw new Error(`No se encontró ningun plato con ID: ${id}`);
            }

            const changedOrder = await db.order.update({
                where: { orderId: id },
                data: { status: status }
            });
            return changedOrder;

        } catch (error) {
            console.error(`Error al intentar cambiar el pedido con ID ${id}:`, error);
            throw new Error(`No se pudo cambiar el estado del pedido con ID ${id}.`);
        }
    }
}
