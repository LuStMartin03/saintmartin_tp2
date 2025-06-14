import { PrismaClient } from '@prisma/client';

import { ClientService } from '../services/clientService';
import { DishService } from '../services/dishService';
import { OrderDishService } from '../services/orderDishService';

const clientService = new ClientService();
const dishService = new DishService();
const orderDishService = new OrderDishService();

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
            // para clalcular el descuento:
            const totalAmount = await this.calculateTotalAmount(body.dishes);
            const amountOfOrders = await clientService.amountOfOrders(body.clientId);
            const discount = await this.calculateDiscount(amountOfOrders);
            const finalAmount = totalAmount - (totalAmount * discount.percentage / 100);

            const address = await clientService.clientAddress(body.clientId);

            const newOrder = await db.order.create({
                data: {
                    clientId: body.clientId,
                    totalAmount: totalAmount,
                    discount: discount.type,
                    finalAmount: finalAmount,
                    deliveryAddress: address
                }
            });


            // recorrer lista de ids de platos
            // verificar existencia de plato
            // crear orderDish (orderId - dishId - qty)

            await orderDishService.createOrderDish(body.dishes, newOrder.orderId);
            return newOrder;

        } catch (error) {
            console.error("Error al crear orden con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear la orden.");
        }
    }

    async deleteOrder(id: number) {
        try {
            await this.verifyOrderExistence(id);

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
            await this.verifyOrderExistence(id);

            const validStatus = ["pendiente", "en cocina", "enviado"];

            if (!status || !validStatus.includes(status)) {
                throw new Error("Estado incorrecto, debería ser: pendiente, en cocina o enviado.");
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

    async calculateTotalAmount(dishes: number[]) {
        try {
            let totalAmount = 0
            for (let i = 0; i < dishes.length; i++) {
                    const price = await dishService.priceDish(dishes[i]) as number;
                    totalAmount += price;
                }
            return totalAmount;
        } catch (error) {
            console.error(`Error al calcular monto total`, error);
            throw new Error(`No se pudo calcular monto total.`);
        }
    }

    async calculateDiscount(amountOfOrders: number): Promise<{ type: string, percentage: number }> {
        try {
            const discountRules = [
                { minOrders: 7, type: "Top Premium", percentage: 50 },
                { minOrders: 5, type: "Premium", percentage: 20 },
                { minOrders: 3, type: "Habitue", percentage: 10 },
            ];

            for (const rule of discountRules) {
                if (amountOfOrders >= rule.minOrders) {
                    return { type: rule.type, percentage: rule.percentage };
                }
            }

            return { type: "Sin descuento", percentage: 0 };
        } catch (error) {
            console.error("Error al crear orden con los datos:");
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear la orden.");
        }
    }

    async verifyOrderExistence(id: number) {
        try {
            const order = await db.order.findFirst({
                where: { orderId: id },
            });

            if (!order) {
                throw new Error(`No se encontró ningun plato con ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error al intentar cambiar el pedido con ID ${id}:`, error);
            throw new Error(`No se pudo cambiar el estado del pedido con ID ${id}.`);
        }
    }
}