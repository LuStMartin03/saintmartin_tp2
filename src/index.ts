import express from 'express';
import usuariosRouter from './routers/usuario_routers';
import platosRouter from './routers/platos_routers';
import pedidosRouter from './routers/pedidos_routers';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API del restaurante funcionando');
});

app.use('/usuarios', usuariosRouter);

app.use('/platos', platosRouter);

app.use('/pedidos', pedidosRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
