# Notas efímeras

Aplicación de notas construida con Node.js y Express, desplegada como función serverless en Vercel. Las notas se guardan únicamente en la memoria del servidor, por lo que desaparecen al reiniciarse o redesplegarse el entorno.

## Uso local

```
npm install
npm start
```

La aplicación queda disponible en `http://localhost:3000`.

## Endpoints

- `GET /api/estado`: estado del servidor y número de notas almacenadas.
- `GET /api/notas`: lista de notas.
- `POST /api/notas`: crea una nota (`{ "texto": "..." }`).
- `DELETE /api/notas/:id`: elimina una nota por id.
