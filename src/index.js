import app from './app.js'
import { connectDB } from './db.js';


connectDB();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { /* Aqui mandamos a server al puerto y guardamos en una variable */
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
});
