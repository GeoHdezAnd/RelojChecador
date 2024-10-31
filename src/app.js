import express, { json } from 'express' // Nos permite usar el import el type: module que agregamos al package.json
import morgan from 'morgan'
import path from 'path' // Maeajr rutas
// Escuchar cambios en html y css
import livereload from 'livereload'
import connectLivereload from 'connect-livereload'
import methodOverride from 'method-override'
import session from 'express-session'
import { engine } from 'express-handlebars'
import indexRoutes from './routes/index.js'
import userRouter from './routes/users.js'
// import empleadosRouter from './routes/empleados.js'
import { fileURLToPath } from 'url'

const app = express()

// PATH
const __filename = fileURLToPath(import.meta.url) // Obtener nombre de archivo
const __dirname = path.dirname(__filename) // Obtener el directorio


// HBS Y CSS listen
const liveReloadServer = livereload.createServer()
liveReloadServer.watch([
  path.join(__dirname, 'public'),
  path.join(__dirname, 'views'),
  path.join(__dirname, 'routes')
]); // Observa la carpeta completa

app.use(connectLivereload())
app.use(morgan('dev'))
app.use(json())
app.disable('x-powered-by')

/* Settings */
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(express.urlencoded({extended: false})); // Para entender los datos que recibe
app.use(methodOverride('_method')); // Para dar acceso a methodos delete y put
app.use(session({ // Las sessiones d express permiten autenticar ususario y almacenar datos temporalmente
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));

// Rutas
app.use(indexRoutes);
app.use(userRouter);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Esucha cambios y recarga automaticamente
liveReloadServer.server.once("connection", () =>{
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use((req, res) => {
  res.status(404).send('<h1>Pagina no encontrada</h1>')
});



// Lo exportamos para poder usarlo en index.js
export default app
