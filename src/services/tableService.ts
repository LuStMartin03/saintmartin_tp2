import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface tableData {
    tableNumber: number;
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
                where: { tableNumber: id },
            });

            if (!table) {
                throw new Error(`No se encontró ninguna mesa con ID: ${id}`);
            }

            const deletedTable = await db.table.delete({
                where: { tableNumber: id },
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
                where: { tableNumber: body.tableNumber },
            });

            if (!table) {
                throw new Error(`No se encontró ninguna mesa con ID: ${body.tableNumber}`);
            }

            const changedTable = await db.table.update({
                where: { tableNumber: body.tableNumber },
                data: { status: body.status }
            });
            return changedTable;

        } catch (error) {
            console.error(`Error al intentar cambiar el estado de la mesa con ID ${body.tableNumber}:`, error);
            throw new Error(`No se pudo cambiar el estado de la mesa con ID ${body.tableNumber}.`);
        }
    }
}
