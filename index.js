const express = require('express');
const routes = require('./routes');
const path = require('path'); // path lee el file sytem
// const bodyParser = require('body-parser');
const flash = require('connect-flash')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// helpers co alguas fuciones
const helpers = require('./helpers')


// Crear la conexion a la base de datos
const db = require('./config/db');


 // importar el modelo
 require('./models/Proyectos');
 require('./models/Tareas');
 require('./models/Usuarios');
 
db.sync()
    .then(()=>console.log('conectado al servidor'))
    .catch(error=> console.log(error))


// Crear una aplicacion de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Carpeta de la vistas
app.set('views', path.join(__dirname,'./views'));

// Agregar flash message
app.use(flash());
app.use(cookieParser());

// sessiones nos permiten mavegar entre diferentes paginas si tener que volver a iniciar session
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar los helper
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes= req.flash();
    next();
});




// Habilitar  bodyParser para leer datos del formulario 
// body parse fue deprecado 
app.use(express.urlencoded({extended:true}));

app.use('/', routes());

// definir puerto para express
app.listen(3000);



