import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface orderData {
    clientId: number,
    totalAmount: number,
    status: string,
    deliveryAddress: string
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
            // buscar la direccion del cliente en la db
            const order = await db.order.create({
                data: body,
            });
            return order;
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
