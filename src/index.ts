import express from 'express';
import adminRouter from './routers/adminRouter';
import tableRouter from './routers/tableRouter';

const app = express();
app.use(express.json());


app.get('/', (_req, res) => {
    res.send('API - Restaurante “Lo de Miguel”');
});

app.use('/admin', adminRouter);
app.use('/table', tableRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
