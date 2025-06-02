import express from 'express';
import adminRouter from './routers/adminRouter';
import clientRouter from './routers/clientRouter';
import tableRouter from './routers/tableRouter';
import dishRouter from './routers/dishRouter';


const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API - Restaurante “Lo de Miguel”');
});

app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/table', tableRouter);
app.use('/dish', dishRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
