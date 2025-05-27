"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableService = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class TableService {
    async getAllTables() {
        try {
            const mesas = await db.mesa.findMany();
            return mesas;
        }
        catch (error) {
            console.error("Error al obtener las mesas desde la base de datos:", error);
            throw new Error("No se pudieron obtener las mesas.");
        }
    }
    async createTable(body) {
        try {
            const table = await db.mesa.create({
                data: body,
            });
            return table;
        }
        catch (error) {
            console.error("Error al crear administrador con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el administrador.");
        }
    }
    async deleteTable(id) {
        try {
            const table = await db.mesa.findFirst({
                where: { numeroDeMesa: id },
            });
            if (!table) {
                throw new Error(`No se encontró ningúna mesa con ID: ${id}`);
            }
            const deletedTable = await db.mesa.delete({
                where: { numeroDeMesa: id },
            });
            return deletedTable;
        }
        catch (error) {
            console.error(`Error al intentar eliminar la mesa con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar la mesa con ID ${id}.`);
        }
    }
    async changeTableStatus(body) {
        try {
            const table = await db.mesa.findFirst({
                where: { numeroDeMesa: body.numeroDeMesa },
            });
            if (!table) {
                throw new Error(`No se encontró ningúna mesa con ID: ${body.numeroDeMesa}`);
            }
            const changedTable = await db.mesa.update({
                where: { numeroDeMesa: body.numeroDeMesa },
                data: { estado: body.estado }
            });
            return changedTable;
        }
        catch (error) {
            console.error(`Error al intentar eliminar la mesa con ID ${body.numeroDeMesa}:`, error);
            throw new Error(`No se pudo eliminar la mesa con ID ${body.numeroDeMesa}.`);
        }
    }
}
exports.TableService = TableService;
