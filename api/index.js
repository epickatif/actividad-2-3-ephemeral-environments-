const express = require('express');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;
const horaInicio = new Date();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

let notas = [];
let siguienteId = 1;

app.get('/api/estado', (req, res) => {
  res.json({
    mensaje: 'La aplicación está activa en un entorno efímero.',
    fechaHora: new Date().toISOString(),
    activaDesde: horaInicio.toISOString(),
    notasAlmacenadas: notas.length,
  });
});

app.get('/api/notas', (req, res) => {
  res.json(notas);
});

app.post('/api/notas', (req, res) => {
  const { texto } = req.body;

  if (!texto || !texto.trim()) {
    return res.status(400).json({ mensaje: 'El campo "texto" es obligatorio' });
  }

  const nuevaNota = { id: siguienteId++, texto: texto.trim(), creadaEn: new Date().toISOString() };
  notas.push(nuevaNota);

  res.status(201).json(nuevaNota);
});

app.delete('/api/notas/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = notas.findIndex(n => n.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: `No existe una nota con id ${id}` });
  }

  const [notaEliminada] = notas.splice(indice, 1);
  res.json({ mensaje: 'Nota eliminada', nota: notaEliminada });
});

if (require.main === module) {
  app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });
}

module.exports = app;
