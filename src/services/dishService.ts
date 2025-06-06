import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface dishData {
    name: string,
    description: string,
    price: number,
    category: string
}

export class DishService {
    async getAllDishes() {
        try {
            const dishes = await db.dish.findMany();
            return dishes;
        } catch (error) {
            console.error("Error al obtener platos desde la base de datos:", error);
            throw new Error("No se pudieron obtener los platos.");
        }
    }

    async createDish(body: dishData) {
        try {
            const dish = await db.dish.create({
                data: body,
            });
            return dish;
        } catch (error) {
            console.error("Error al crear plato con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el plato.");
        }
    }

    async deleteDish(id: number) {
        try {
            await this.verifyDishExists(id)

            const deletedDish = await db.dish.delete({
                where: { dishId: id },
            });

            return deletedDish;

        } catch (error) {
            console.error(`Error al intentar eliminar el plato con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el plato con ID ${id}.`);
        }
    }

    async changeDishPrice(id: number, price: number) {
        try {
            await this.verifyDishExists(id)

            const changedDish = await db.dish.update({
                where: { dishId: id },
                data: { price: price }
            });
            return changedDish;

        } catch (error) {
            console.error(`Error al intentar cambiar el precio del plato con ID ${id}:`, error);
            throw new Error(`No se pudo cambiar el precio del plato con ID ${id}.`);
        }
    }

    async verifyDishExists(id: number) {
        try {
            const dish = await db.dish.findFirst({
                where: {
                    dishId: id
                },
            });
            if (!dish) {
                throw new Error(`No hay ningún plato con el ID: ${id}`);
            }
        } catch (error) {
            console.error("Error al verificar plato.");
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar si el plato existe.");
        }
    }
}
