import { PrismaClient } from '@prisma/client';

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
            return admins;
        } catch (error) {
            console.error("Error al obtener administradores desde la base de datos:", error);
            throw new Error("No se pudieron obtener los administradores.");
        }
    }

    async createAdmin(body: adminData) {
        try {
            if (!body.password) {
                throw new Error("No se ingreso la contraseña");
            }

            const email = await db.admin.findFirst({
                where: {
                    email: body.email
                }
            })
            if (!!email) {
                throw new Error("Email ya registrado");
            }

            const admin = await db.admin.create({
                data: body,
            });
            return admin;
        } catch (error) {
            console.error("Error al crear administrador con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el administrador.");
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
                throw new Error(`No hay ningún administrador con los datos ingresados.`);
            }
            // const token = generarToken({ id: admin.adminId, rol: 'cliente' });
            return { mensaje: 'Login exitoso' };
        } catch (error) {
            console.error("Error al buscar administrador con los datos:", {email, password});
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar el administrador.");
        }
    }

    async deleteAdmin(id: number) {
        try {
            const admin = await db.admin.findFirst({
                where: { adminId: id },
            });

            if (!admin) {
                throw new Error(`No se encontró ningún administrador con ID: ${id}`);
            }

            const deletedAdmin = await db.admin.delete({
                where: { adminId: id },
            });

            return deletedAdmin;

        } catch (error) {
            console.error(`Error al intentar eliminar el administrador con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el administrador con ID ${id}.`);
        }
    }

    async changePassword(body: adminData) {
        try {
            const admin = await db.admin.findFirst({
                where: { email: body.email, password: body.password }
            })
            if (!admin) {
                throw new Error(`No hay ningún administrador con el ID ingresado.`);
            }

            const changedAdmin = await db.admin.update({
                where: { adminId: admin.adminId },
                data: { password: body.newPassword }
            });
            return changedAdmin;

        } catch (error) {
            console.error("Error al cambiar contraseña con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo cambiar la contraseña.");
        }
    }
}
