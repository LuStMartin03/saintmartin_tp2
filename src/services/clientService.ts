import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface clientData {
    name: string;
    email: string;
    phone: number;
    password: string;
    address: string;
}

export class ClientService {
    async getAllClients() {
        try {
            const clients = await db.clients.findMany();
            return clients;
        } catch (error) {
            console.error("Error al obtener clientes desde la base de datos:", error);
            throw new Error("No se pudieron obtener los clientes.");
        }
    }

    async createClient(body: clientData) {
        try {
            if (!body.password) {
                throw new Error("No se ingreso la contraseña");
            }

            const email = await db.clients.findFirst({
                where: {
                    email: body.email
                }
            })
            if (!!email) {
                throw new Error("Email ya registrado");
            }

            const phone = await db.clients.findFirst({
                where: {
                    phone: body.phone
                }
            })
            if (!!phone) {
                throw new Error("Telefono ya registrado");
            }

            const client = await db.clients.create({
                data: body,
            });
            return client;
        } catch (error) {
            console.error("Error al crear cliente con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo crear el cliente.");
        }
    }

    async loginClient(email: string, password: string) {
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
        } catch (error) {
            console.error("Error al buscar cliente con mail: ", email, " y contraseña: ", password);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar el cliente.");
        }
    }

    async deleteClient(id: number) {
        try {
            await this.verifyClientExistence(id)

            const deletedClient = await db.clients.delete({
                where: { clientId: id },
            });

            return deletedClient;

        } catch (error) {
            console.error(`Error al intentar eliminar el cliente con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el cliente con ID ${id}.`);
        }
    }

    async changePassword(body: clientData) {
        try {
            const client = await db.clients.findFirst({
                where: { email: body.email, password: body.password }
            });
            if (!client) {
                throw new Error(`No hay ningún administrador con el ID ingresado.`);
            }

            const changedClient = await db.clients.update({
                where: { clientId: client.clientId },
                data: { password: body.password }
            });
            return changedClient;

        } catch (error) {
            console.error("Error al cambiar contraseña con los datos:", body);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo cambiar la contraseña.");
        }
    }

    async clientAddress(id: number) {
        try {
            await this.verifyClientExistence(id)
            const result = await db.clients.findUnique({
            where: { clientId: id },
            select: {
                address: true
            }
            });
            if (!result) {throw new Error(`No existe la direccion del usuario: ${id}`);}
            else {
                return result.address;
            }

        } catch (error) {
            console.error(`Error al encontrar domicilio del cliente: ${id}`);
            console.error("Detalles del error:", error);
            throw new Error("No se pudo cambiar la contraseña.");
        }
    }

    async verifyClientExistence(id:number) {
        try {
            const client = await db.clients.findFirst({
                where: {
                    clientId: id
                },
            });
            if (!client) {
                throw new Error(`No hay ningún cliente con el ID ingresado.`);
            }
        } catch (error) {
            console.error("Error al verificar cliente.");
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar si el cliente existe.");
        }
    }

    async amountOfOrders(id:number) {
        try {
            await this.verifyClientExistence(id);
            const order = await db.order.count({
                where: {
                    clientId: id
                },
            });
            return order;
        } catch (error) {
            console.error("Error al verificar cliente.");
            console.error("Detalles del error:", error);
            throw new Error("No se pudo verificar si el cliente existe.");
        }
    }
}
