"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableService = void 0;
const client_1 = require("@prisma/client");
const BaseError_1 = require("../errors/BaseError");
const db = new client_1.PrismaClient();
class TableService {
    async getAllTables() {
        try {
            const tables = await db.table.findMany();
            return { mensaje: "Mesas obtenidas con éxito", data: tables };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al obtener mesas desde la base de datos.");
        }
    }
    async createTable(body) {
        try {
            const totalMesas = await db.table.count();
            if (totalMesas >= 15) {
                throw new BaseError_1.BadRequestError("No se pueden crear más de 15 mesas.");
            }
            const table = await db.table.create({
                data: body,
            });
            return { mensaje: "Mesa creada con éxito", data: table };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al crear mesa.");
        }
    }
    async deleteTable(id) {
        try {
            const table = await db.table.findFirst({
                where: { tableId: id },
            });
            if (!table) {
                throw new BaseError_1.NotFoundError(`No se encontró ninguna mesa con ID: ${id}`);
            }
            const deletedTable = await db.table.delete({
                where: { tableId: id },
            });
            return { mensaje: "Mesa eliminada con éxito", data: deletedTable };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al eliminar mesa.");
        }
    }
    async changeTableStatus(body) {
        try {
            await this.verifyTableExistance;
            const validStatus = ["reservada", "disponible"];
            if (!body.status || !validStatus.includes(body.status)) {
                throw new BaseError_1.BadRequestError("Estado incorrecto, debería ser: reservada o disponible.");
            }
            const changedTable = await db.table.update({
                where: { tableId: body.tableId },
                data: { status: body.status }
            });
            return { mensaje: "Estado de mesa cambiado con éxito", data: changedTable };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al cambiar estado de la mesa.");
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
            return { data: tables };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al obtener mesas disponibles desde la base de datos.");
        }
    }
    async bookTable(body) {
        try {
            await this.verifyTableExistance;
            const tables = await db.table.update({
                where: {
                    tableId: body.tableId
                },
                data: {
                    status: "reservada"
                }
            });
            return { message: "Mesa reservada con éxito.", data: tables };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al reservar mesa.");
        }
    }
    async verifyTableExistance(id) {
        try {
            const table = await db.table.findFirst({
                where: { tableId: id },
            });
            if (!table) {
                throw new BaseError_1.NotFoundError(`No se encontró ninguna mesa con ID: ${id}`);
            }
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al verificar existencia de la mesa.");
        }
    }
}
exports.TableService = TableService;
