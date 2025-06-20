import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, ConflictError, InternalServerError, BaseError } from '../errors/BaseError';


const db = new PrismaClient();

interface tableData {
    tableId: number;
    status?: string;
}

export class TableService {
    async getAllTables() {
        try {
            const tables = await db.table.findMany();
            return { mensaje: "Mesas obtenidas con éxito", data: tables };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener mesas desde la base de datos.");
        }
    }

    async createTable(body: tableData) {
        try {
            const totalMesas = await db.table.count();

            if (totalMesas >= 15) {
                throw new BadRequestError("No se pueden crear más de 15 mesas.");
            }
            const table = await db.table.create({
                data: body,
            });
            return { mensaje: "Mesa creada con éxito", data: table };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al crear mesa.");
        }
    }

    async changeTableStatus(id: number, status: string) {
        try {            
            await this.verifyTableExistance;

            const changedTable = await db.table.update({
                where: { tableId: id },
                data: { status: status }
            });
            return { mensaje: "Estado de mesa cambiado con éxito", data: changedTable };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al cambiar estado de la mesa.");
        }
    }

    async deleteTable(id: number) {
        try {
            const table = await db.table.findFirst({
                where: { tableId: id },
            });

            if (!table) {
                throw new NotFoundError(`No se encontró ninguna mesa con ID: ${id}`);
            }

            const deletedTable = await db.table.delete({
                where: { tableId: id },
            });

            return { mensaje: "Mesa eliminada con éxito", data: deletedTable };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al eliminar mesa.");
        }
    }

    async disponibility() {
        try {
            const tables = await db.table.findMany({
                where: {
                    status: "disponible"
                },
                select: {
                    tableId: true
                }
            });
            return { message: "Mesas disponibles obtenidas con éxito", data: tables };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener mesas disponibles desde la base de datos.");
        }
    }

    async verifyTableExistance(id: number) {
        try {
            const table = await db.table.findFirst({
                    where: { tableId: id },
                });

                if (!table) {
                    throw new NotFoundError(`No se encontró ninguna mesa con ID: ${id}`);
                }
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar existencia de la mesa.");
        }
    }

    async verifyTableDisponibility(id: number) {
        try {
            await this.verifyTableExistance(id);
            const disponibility = await db.table.findFirst({
                where: {
                    tableId: id
                },
                select: {
                    status: true
                }
            });
            return disponibility?.status;
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar disponibilad de la mesa.");
        }
    }
}
