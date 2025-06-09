import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface tableData {
    tableId: number;
    status: string;
}

export class TableService {
    async getAllTables() {
        try {
            const tables = await db.table.findMany();
            return tables;
        } catch (error) {
            console.error("Error al obtener las mesas desde la base de datos:", error);
            throw new Error("No se pudieron obtener las mesas.");
        }
    }

    async createTable(body: tableData) {
        try {
            const totalMesas = await db.table.count();

            if (totalMesas >= 15) {
                throw new Error("No se pueden crear más de 15 mesas.");
            }
            const table = await db.table.create({
                data: body,
            });
            return table;

        } catch (error) {
            console.error("Error al crear la mesa con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear la mesa.");
        }
    }

    async deleteTable(id: number) {
        try {
            const table = await db.table.findFirst({
                where: { tableId: id },
            });

            if (!table) {
                throw new Error(`No se encontró ninguna mesa con ID: ${id}`);
            }

            const deletedTable = await db.table.delete({
                where: { tableId: id },
            });

            return deletedTable;

        } catch (error) {
            console.error(`Error al intentar eliminar la mesa con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar la mesa con ID ${id}.`);
        }
    }

    async changeTableStatus(body: tableData) {
        try {
            const table = await db.table.findFirst({
                where: { tableId: body.tableId },
            });

            if (!table) {
                throw new Error(`No se encontró ninguna mesa con ID: ${body.tableId}`);
            }

            const validStatus = ["reservada", "diponible"];

            if (!body.status || !validStatus.includes(body.status)) {
                throw new Error("Estado incorrecto, debería ser: pendiente, en cocina o enviado.");
            }

            const changedTable = await db.table.update({
                where: { tableId: body.tableId },
                data: { status: body.status }
            });
            return changedTable;

        } catch (error) {
            console.error(`Error al intentar cambiar el estado de la mesa con ID ${body.tableId}:`, error);
            throw new Error(`No se pudo cambiar el estado de la mesa con ID ${body.tableId}.`);
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
            return tables;
        } catch (error) {
            console.error(`Error al intentar cambiar el estado de la mesa con ID :`, error);
            throw new Error(`No se pudo cambiar el estado de la mesa con ID `);
        }
    }
}
