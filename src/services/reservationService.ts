import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError, ConflictError, InternalServerError, BaseError } from '../errors/BaseError';
import { ClientService } from '../services/clientService';
import { TableService } from '../services/tableService';

const clientService = new ClientService();
const tableService = new TableService();
const db = new PrismaClient();

interface reservationData {
    tableId: number;
    clientId: number;
}

export class ReservationService {
    async getAllReservations() {
        try {
            const reservations = await db.reservation.findMany();
            return { mensaje: "Reservaciones obtenidas con éxito", data: reservations };
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al obtener reservaciones desde la base de datos.");
        }
    }

    async createReservation(body: reservationData) {
        try {
            const disponibility = await tableService.verifyTableDisponibility(body.tableId);
            if (disponibility == "reservada") {
                throw new ConflictError(`La mesa ${body.tableId} ya esta reservada.`);
            }
            await clientService.verifyClientExistence(body.clientId);

            const reservationClient = await db.reservation.count({
                where: { clientId: body.clientId }
            });

            if (reservationClient >= 1) {
                throw new ConflictError(`El cliente ${body.clientId} ya tiene una mesa reservada.`);
            }

            const reservation = await db.reservation.create({
                data: {
                    tableId: body.tableId,
                    clientId: body.clientId
                }
            });
            await tableService.changeTableStatus(body.tableId, "reservada");

            return {
                message: "Reservacion creada con éxito.", data: reservation
            }
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al crear reservacion.");
        }
    }

    async deleteReservation(id: number) {
        try {
            const disponibility = await tableService.verifyTableDisponibility(id);
            if (disponibility == "disponible") {
                throw new ConflictError(`La mesa ${id} ya esta disponible.`);
            }
            const reservation = await db.reservation.findFirst({
                where: {
                    tableId: id
                }
            });
            if (!reservation) throw new NotFoundError("No se encontro la reserva a eliminar");
            
            const deletedReservation = await db.reservation.delete({
                where: {
                    reservationId: reservation.reservationId
                }
            });
            await tableService.changeTableStatus(id, "disponible");
            return { message: "Reserva eliminada con éxito.", data: deletedReservation}
        } catch (error) {
            console.error("Detalles del error:", error);
            if (error instanceof BaseError) throw error;
            throw new InternalServerError("Ocurrió un error inesperado al crear reservacion.");
        }
    }
}