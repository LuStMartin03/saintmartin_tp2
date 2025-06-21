import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, InternalServerError, BaseError } from '../errors/BaseError';

import { ClientService } from '../services/clientService';
import { DishService } from '../services/dishService';
import { OrderDishService } from '../services/orderDishService';

const clientService = new ClientService();
const dishService = new DishService();
const orderDishService = new OrderDishService();

const db = new PrismaClient();

interface orderData {
    clientId: number,
    dishes: number[]
}

export class OrderService {
    async getAllOrders() {
        try {
            const orders = await db.order.findMany();
            return {message: "Pedidos obtenidos con éxito", data: orders};
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener pedido desde la base de datos.");
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

            await orderDishService.createOrderDish(body.dishes, newOrder.orderId);
            return {message: "Pedido creado con éxito", data: newOrder};

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al crear pedido.");
        }
    }

    async deleteOrder(id: number) {
        try {
            await this.verifyOrderExistence(id);

            await db.orderDish.deleteMany({
                where: { orderId: id }
            });

            const deletedOrder = await db.order.delete({
                where: { orderId: id }
            });

            return {message: "Pedido eliminado con éxito", data: deletedOrder};

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al eliminar pedido.");
        }
    }

    async changeStatus(id: number, status: string) {
        try {
            await this.verifyOrderExistence(id);

            const validStatus = ["pendiente", "en cocina", "enviado"];

            if (!status || !validStatus.includes(status)) {
                throw new BadRequestError("Estado incorrecto, debería ser: pendiente, en cocina o enviado.");
            }


            const changedOrder = await db.order.update({
                where: { orderId: id },
                data: { status: status }
            });
            return {message: "Estado cambiado con éxito", data: changedOrder};

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al cambiar estado de la orden.");
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
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al calcular precio total del pedido.");
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
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al calcular descuento.");
        }
    }

    async verifyOrderExistence(id: number) {
        try {
            const order = await db.order.findFirst({
                where: { orderId: id },
            });

            if (!order) {
                throw new NotFoundError(`No se encontró ningun pedido con ID: ${id}`);
            }
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar existencia del pedido.");
        }
    }

    async seeStatus(id: number) {
        try {
            await this.verifyOrderExistence(id);
            const status = await db.order.findFirst({
                where: {
                    orderId: id
                },
                select: {
                    status: true
                }
            });
            if (!status) throw new NotFoundError(`No se encontro el estado de la mesa con ID: ${id}`);  
            return {message: "Estado obtenido con éxito", data: status?.status};

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar existencia del pedido.");
        }
    }
}