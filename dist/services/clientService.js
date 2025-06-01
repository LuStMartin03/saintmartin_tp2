"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class ClientService {
    async getAllClients() {
        try {
            const clients = await db.clients.findMany();
            return clients;
        }
        catch (error) {
            console.error("Error al obtener clientes desde la base de datos:", error);
            throw new Error("No se pudieron obtener los clientes.");
        }
    }
    async createClient(body) {
        try {
            if (!body.password) {
                throw new Error("No se ingreso la contraseña");
            }
            const client = await db.clients.create({
                data: body,
            });
            return client;
        }
        catch (error) {
            console.error("Error al crear cliente con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el cliente.");
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
                throw new Error(`No hay ningún cliente con los datos ingresados.`);
            }
            return client;
        }
        catch (error) {
            console.error("Error al buscar cliente con mail: ", email, " y contraseña: ", password);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar el cliente.");
        }
    }
    async deleteClient(id) {
        try {
            const client = await db.clients.findFirst({
                where: { clientId: id },
            });
            if (!client) {
                throw new Error(`No se encontró ningún cliente con ID: ${id}`);
            }
            const deletedClient = await db.clients.delete({
                where: { clientId: id },
            });
            return deletedClient;
        }
        catch (error) {
            console.error(`Error al intentar eliminar el cliente con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el cliente con ID ${id}.`);
        }
    }
    async changePassword(id, body) {
        try {
            const client = await db.clients.findFirst({
                where: {
                    clientId: id
                },
            });
            if (!client) {
                throw new Error(`No hay ningún cliente con el ID ingresado.`);
            }
            const changedClient = await db.clients.update({
                where: { clientId: id },
                data: { password: body.password }
            });
            return changedClient;
        }
        catch (error) {
            console.error("Error al cambiar contraseña con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo cambiar la contraseña.");
        }
    }
}
exports.ClientService = ClientService;
