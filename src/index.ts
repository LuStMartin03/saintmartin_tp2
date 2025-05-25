import express from 'express';
import clienteRouter from './routers/clienteRouter';
import adminRouter from './routers/adminRouter';


const app = express();
app.use(express.json());


app.get('/', (_req, res) => {
    res.send('API - Restaurante “Lo de Miguel”');
});

app.use('/cliente', clienteRouter);
app.use('/admin', adminRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
