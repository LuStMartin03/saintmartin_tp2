import { Router } from 'express';
import { createReservation, deleteReservation, getAllReservations } from '../controllers/reservationController';
import { authenticateRol } from '../middleware/authMiddleware';

const reservationRouter = Router();

reservationRouter.get('/', authenticateRol('admin'), getAllReservations);
reservationRouter.post('/create', authenticateRol('admin'), createReservation);
reservationRouter.delete('/:id', authenticateRol('admin'), deleteReservation);

export default reservationRouter;