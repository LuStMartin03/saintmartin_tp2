import express from 'express';
import db from './bd/connection';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API del restaurante funcionando');
});

// Endpoint de ejemplo
app.get('/platos', (req, res) => {
    try {
    const platos = db.prepare('SELECT * FROM platos').all();
    res.json(platos);
    } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
