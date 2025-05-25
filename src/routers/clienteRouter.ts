import express, { Router } from 'express';


const clienteRouter = Router();
clienteRouter.use(express.json());

clienteRouter.get('/', (_req, res) => {
    res.send('CLI');
});

export default clienteRouter;