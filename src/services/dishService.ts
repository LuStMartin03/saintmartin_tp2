import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, ConflictError, InternalServerError, BaseError } from '../errors/BaseError';

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
            const menu = await db.dish.findMany();
            return { mensaje: "menú obtenido con éxito", data: menu };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener platos de la base de datos.");
        }
    }

    async createDish(body: dishData) {
        try {
            const dish = await db.dish.create({
                data: body,
            });
            return {message: "Plato creado con éxito", data: dish};
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al crear plato.");
        }
    }

    async deleteDish(id: number) {
        try {
            await this.verifyDishExistence(id)

            const deletedDish = await db.dish.delete({
                where: { dishId: id },
            });

            return {message: "Plato eliminado con éxito", data: deletedDish};

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al eliminar plato.");
        }
    }

    async changeDishPrice(id: number, price: number) {
        try {
            await this.verifyDishExistence(id);

            const changedDish = await db.dish.update({
                where: { dishId: id },
                data: { price: price }
            });

            return {message: "Precio cambiado con éxito", data: changedDish};
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al cambiar precio del plato.");
        }
    }

    async verifyDishExistence(id: number) {
        try {
            const dish = await db.dish.findFirst({
                where: {
                    dishId: id
                },
            });
            if (!dish) {
                throw new NotFoundError(`No hay ningún plato con el ID: ${id}`);
            }
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar existencia del plato.");
        }
    }

    async priceDish(id: number) {
        try {
            await this.verifyDishExistence(id);
            const dishPrice = await db.dish.findFirst({
                where: {
                    dishId: id
                },
                select: {
                    price: true
                }
            });
        return dishPrice?.price;

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener el precio del plato.");
        }
    }
}
