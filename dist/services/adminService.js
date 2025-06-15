"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const BaseError_1 = require("../errors/BaseError");
const jwt_1 = require("../utils/jwt");
const db = new client_1.PrismaClient();
class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.admin.findMany();
            return { mensaje: "Admins obtenidos con éxito", data: admins };
        }
        catch (error) {
            console.error("Error al obtener administradores desde la base de datos:", error);
            throw new BaseError_1.InternalServerError("Error interno al obtener administradores.");
        }
    }
    async createAdmin(body) {
        try {
            if (!body.password) {
                throw new BaseError_1.BadRequestError("No se ingresó la contraseña.");
            }
            const email = await db.admin.findFirst({
                where: {
                    email: body.email
                }
            });
            if (email) {
                throw new BaseError_1.ConflictError("El email ya está registrado.");
            }
            const admin = await db.admin.create({
                data: body,
            });
            return { mensaje: "Admin creado con éxito", data: admin };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError) {
                throw error;
            }
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al registrar el administrador.");
        }
    }
    async loginAdmin(email, password) {
        try {
            const admin = await db.admin.findFirst({
                where: {
                    email: email,
                    password: password
                },
            });
            if (!admin) {
                throw new BaseError_1.NotFoundError("Credenciales incorrectas. Verifique el email y la contraseña.");
            }
            const token = (0, jwt_1.generarToken)({ id: admin.adminId, rol: 'admin' });
            return { mensaje: "Login exitoso", token };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError) {
                throw error;
            }
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al hacer login.");
        }
    }
    async deleteAdmin(id) {
        try {
            const admin = await db.admin.findFirst({
                where: { adminId: id },
            });
            if (!admin) {
                throw new BaseError_1.NotFoundError(`No se encontró ningún administrador con ID: ${id}`);
            }
            const deletedAdmin = await db.admin.delete({
                where: { adminId: id },
            });
            return { mensaje: "Admin eliminado con éxito", data: deletedAdmin };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError) {
                throw error;
            }
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al eliminar administrador.");
        }
    }
    async changePassword(body) {
        try {
            const admin = await db.admin.findFirst({
                where: { email: body.email, password: body.password }
            });
            if (!admin) {
                throw new BaseError_1.NotFoundError("No hay ningún administrador con los datos ingresados.");
            }
            const changedAdmin = await db.admin.update({
                where: { adminId: admin.adminId },
                data: { password: body.newPassword }
            });
            return { mensaje: "Contraseña cambiada con éxito", data: changedAdmin };
        }
        catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError_1.BaseError) {
                throw error;
            }
            throw new BaseError_1.InternalServerError("Ocurrió un error inesperado al cambiar contraseña del administrador.");
        }
    }
}
exports.AdminService = AdminService;
