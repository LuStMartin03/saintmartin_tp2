import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, ConflictError, InternalServerError, BaseError } from '../errors/BaseError';
import { generarToken } from '../utils/jwt';

const db = new PrismaClient();

interface adminData {
    email: string,
    password: string,
    newPassword?: string,
}

export class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.admin.findMany();
            return { mensaje: "Admins obtenidos con éxito", data: admins };
        } catch (error) {
            console.error("Error al obtener administradores desde la base de datos:", error);
            throw new InternalServerError("Error interno al obtener administradores.");
        }
    }

    async createAdmin(body: adminData) {
        try {
            if (!body.password) {
                throw new BadRequestError("No se ingresó la contraseña.");
            }

            const email = await db.admin.findFirst({
                where: {
                    email: body.email
                }
            })
            if (email) {
                throw new ConflictError("El email ya está registrado.");
            }

            const admin = await db.admin.create({
                data: body,
            });
            return { mensaje: "Admin creado con éxito", data: admin };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) {
                throw error;
            }
            throw new InternalServerError("Ocurrió un error inesperado al registrar el administrador.");
        }
    }

    async loginAdmin(email: string, password: string) {
        try {
            const admin = await db.admin.findFirst({
                where: {
                    email: email,
                    password: password
                },
            });
            if (!admin) {
                throw new NotFoundError("Credenciales incorrectas. Verifique el email y la contraseña.");
            }
            const token = generarToken({ id: admin.adminId, rol: 'admin' });
            return { mensaje: "Login exitoso", token };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) {
                throw error;
            }
            throw new InternalServerError("Ocurrió un error inesperado al hacer login.");
        }
    }

    async deleteAdmin(id: number) {
        try {
            const admin = await db.admin.findFirst({
                where: { adminId: id },
            });

            if (!admin) {
                throw new NotFoundError(`No se encontró ningún administrador con ID: ${id}`);
            }

            const deletedAdmin = await db.admin.delete({
                where: { adminId: id },
            });

            return { mensaje: "Admin eliminado con éxito", data: deletedAdmin };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) {
                throw error;
            }
            throw new InternalServerError("Ocurrió un error inesperado al eliminar administrador.");
        }
    }

}
