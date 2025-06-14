"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const client_1 = require("@prisma/client");
const BaseError_1 = require("../errors/BaseError");
const db = new client_1.PrismaClient();
class ClientService {
    async getAllClients() {
        try {
            const clients = await db.clients.findMany();
            return clients;
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al obtener clientes desde la base de datos.");
        }
    }
    async createClient(body) {
        try {
            if (!body.password) {
                throw new BaseError_1.BadRequestError("No se ingresó la contraseña.");
            }
            const email = await db.clients.findFirst({
                where: {
                    email: body.email
                }
            });
            if (email) {
                throw new BaseError_1.ConflictError("El email ya está registrado.");
            }
            const phone = await db.clients.findFirst({
                where: {
                    phone: body.phone
                }
            });
            if (phone) {
                throw new BaseError_1.ConflictError("El teléfono ya está registrado.");
            }
            const client = await db.clients.create({
                data: body,
            });
            return client;
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al registrar el cliente.");
        }
    }
    async loginClient(email, password) {
        try {
            const client = await db.clients.findFirst({
                where: {
                    email: email,
                    password: password
                },
            });
            if (!client) {
                throw new BaseError_1.NotFoundError("Credenciales incorrectas. Verifique el email y la contraseña.");
            }
            // generar token
            return { mensaje: 'Login exitoso' };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al verificar el cliente.");
        }
    }
    async deleteClient(id) {
        try {
            await this.verifyClientExistence(id);
            const deletedClient = await db.clients.delete({
                where: { clientId: id },
            });
            return deletedClient;
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al eliminar al cliente.");
        }
    }
    async changePassword(body) {
        try {
            const client = await db.clients.findFirst({
                where: { email: body.email, password: body.password }
            });
            if (!client) {
                throw new BaseError_1.NotFoundError("No hay ningún cliente con los datos ingresados.");
            }
            const changedClient = await db.clients.update({
                where: { clientId: client.clientId },
                data: { password: body.password }
                // new password
            });
            return changedClient;
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al cambiar la contraseña.");
        }
    }
    async clientAddress(id) {
        try {
            await this.verifyClientExistence(id);
            const result = await db.clients.findUnique({
                where: { clientId: id },
                select: {
                    address: true
                }
            });
            if (!result) {
                throw new BaseError_1.NotFoundError(`No existe la direccion del usuario: ${id}`);
            }
            else {
                return result.address;
            }
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al obtener la dirección del usuario.");
        }
    }
    async verifyClientExistence(id) {
        try {
            const client = await db.clients.findFirst({
                where: {
                    clientId: id
                },
            });
            if (!client) {
                throw new BaseError_1.NotFoundError(`No se encontró ninguna orden con ID: ${id}`);
            }
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al verificar la existencia del cliente.");
        }
    }
    async amountOfOrders(id) {
        try {
            await this.verifyClientExistence(id);
            const order = await db.order.count({
                where: {
                    clientId: id
                },
            });
            return order;
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError)
                throw error;
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al contar las ordenes pasadas del cliente");
        }
    }
}
exports.ClientService = ClientService;
