import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, ConflictError, InternalServerError, BaseError } from '../errors/BaseError';
import { generateToken } from '../utils/jwt';

const db = new PrismaClient();

interface clientData {
    name: string;
    email: string;
    phone: number;
    password: string;
    address: string;
    newPassword?: string;
}

export class ClientService {
    async getAllClients() {
        try {
            const clients = await db.clients.findMany();
            return { message: "Clientes obtenidos con éxito", data: clients };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener clientes desde la base de datos.");
        }
    }

    async createClient(body: clientData) {
        try {
            if (!body.password) {
                throw new BadRequestError("No se ingresó la contraseña.");
            }

            const email = await db.clients.findFirst({
                where: {
                    email: body.email
                }
            })
            if (email) {
                throw new ConflictError("El email ya está registrado.");
            }

            const phone = await db.clients.findFirst({
                where: {
                    phone: body.phone
                }
            })
            if (phone) {
                throw new ConflictError("El teléfono ya está registrado.");
            }

            const client = await db.clients.create({
                data: body,
            });
            return { message: "Cliente registrado con éxito", data: client };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al registrar el cliente.");
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
                throw new NotFoundError(`No se encontró ningún cliente con los datos ingresados`);
            }
            const token = generateToken({ id: client.clientId, rol: 'client' });
            return { message: "Login exitoso", data: token };

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar el cliente.");
        }
    }

    async deleteClient(id: number) {
        try {
            await this.verifyClientExistence(id)

            const deletedClient = await db.clients.delete({
                where: { clientId: id },
            });

            return { message: "Cliente eliminado con éxito", data: deletedClient };

        } catch (error) {
            console.error("Detalles del error:", error);          
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al eliminar al cliente.");
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
            if (!result) {throw new NotFoundError(`No existe la direccion del usuario: ${id}`);}
            return result.address;

        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener la dirección del usuario.");
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
                throw new NotFoundError(`No se encontró ningun cliente con ID: ${id}`);
            }
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al verificar la existencia del cliente.");
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
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al contar las ordenes pasadas del cliente");
        }
    }
}
