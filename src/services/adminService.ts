import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface GenerateNewAdmin {
    adminId: number
    correo: string
    contraseña: string
}

export class AdminService {
    async getAllAdmins() {
        try {
            const admins = await db.administrador.findMany();
            return admins;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener administradores.");
        }
    }

    async createAdmin(body: GenerateNewAdmin) {
    try {
      const admin = await db.administrador.create({
        data: body
      })
      return admin;

    } catch (error) {
      console.error("Error creando administrador: ", body)
      console.error(error);
      throw new Error("Error al crear administrador.")
    }
    }


    async deleteAdmin(id: number) {
    try {
      const admin = await db.administrador.findFirst({
        where: {adminId: id}            
      })

      if (!admin) {
        throw new Error("Error al encontrar administrador con id: ${id}.")
      }

      const deletedAdmin = await db.administrador.delete({
        where: {adminId: id}            
      })

      return deletedAdmin;

    } catch (error) {
      console.error("Error eliminando administrador: ")
      console.error(error);
      throw new Error("Error al crear administrador.")
    }
    }
}