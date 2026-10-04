const express = require('express');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/estado', (req, res) => {
  res.json({
    mensaje: 'La aplicación está activa en un entorno efímero.',
    fechaHora: new Date().toISOString(),
  });
});

if (require.main === module) {
  app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });
}

module.exports = app;
