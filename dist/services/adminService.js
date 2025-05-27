"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.administrador.findMany();
            return admins;
        }
        catch (error) {
            console.error("Error al obtener administradores desde la base de datos:", error);
            throw new Error("No se pudieron obtener los administradores.");
        }
    }
    async createAdmin(body) {
        try {
            const admin = await db.administrador.create({
                data: body,
            });
            return admin;
        }
        catch (error) {
            console.error("Error al crear administrador con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el administrador.");
        }
    }
    async loginAdmin(body) {
        try {
            const admin = await db.administrador.findFirst({
                where: {
                    correo: body.correo,
                    contraseña: body.contraseña
                },
            });
            if (!admin) {
                throw new Error(`No hay ningún administrador con los datos ingrasados.`);
            }
            return admin;
        }
        catch (error) {
            console.error("Error al crear administrador con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el administrador.");
        }
    }
    async deleteAdmin(id) {
        try {
            const admin = await db.administrador.findFirst({
                where: { adminId: id },
            });
            if (!admin) {
                throw new Error(`No se encontró ningún administrador con ID: ${id}`);
            }
            const deletedAdmin = await db.administrador.delete({
                where: { adminId: id },
            });
            return deletedAdmin;
        }
        catch (error) {
            console.error(`Error al intentar eliminar el administrador con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el administrador con ID ${id}.`);
        }
    }
    async changePassword(id, body) {
        try {
            const admin = await db.administrador.findFirst({
                where: {
                    adminId: id
                },
            });
            if (!admin) {
                throw new Error(`No hay ningún administrador con los datos ingrasados.`);
            }
            const changedAdmin = await db.administrador.update({
                where: { adminId: id },
                data: { contraseña: body.contraseña }
            });
            return changedAdmin;
        }
        catch (error) {
            console.error("Error al cambiar contraseña con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo cambiar contraseña.");
        }
    }
}
exports.AdminService = AdminService;
