import express from 'express';
import adminRouter from './routers/adminRouter';
import clientRouter from './routers/clientRouter';
import tableRouter from './routers/tableRouter';
import dishRouter from './routers/dishRouter';
import orderRouter from './routers/orderRouter';
import orderDishRouter from './routers/orderDishRouter';
import { errorHandler } from './middleware/errorHandler';


const app = express();
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/table', tableRouter);
app.use('/menu', dishRouter);
app.use('/order', orderRouter);
app.use('/orderDish', orderDishRouter);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
