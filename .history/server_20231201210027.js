
const express = require('express');
const {Command} = require ('commander');
const dotenv =require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const passport = require('passport')
const flash =require('connect-flash')

const configFn = require('./src/Config/config');
const DB = require('./src/db/singleton');

const nodemailer = require('nodemailer');
const program = new Command()

program 
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse()

const options = program.opts()


const initializePassport = require('./src/Config/passport.config');
 
dotenv.config({
  path: `.env.${options.mode}`
});

const settings = configFn()
console.log({settings});

const dbConnection = DB.getConnection(settings)

DB.getConnection(settings)


const config = configFn();

// Construcción de la Cadena de Conexión a MongoDB
const CONNECTION_STRING = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`;


// Impresión de la Cadena de Conexión
console.log(`Conectandose a ${CONNECTION_STRING}`);

const app = express()


app.use(cookieParser('secretkey'))

app.use(session({

  // store: MongoStore.create({
  //   mongoUrl:MONGODB_CONNECT,

  // }),
  secret: 'secretSession',
  resave: true,
  saveUninitialized: true
}));


initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session()); 




// Middleware para el manejo de JSON y datos enviados por formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash())
// Pasa el objeto Passport como argumento


// Configuración handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploader/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploader = multer({ storage: storage });

// Seteo de forma estática la carpeta public
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');


// Crear el servidor HTTP
const httpServer = app.listen(8080, () => {
  console.log(`Servidor express escuchando en el puerto 8080`);
});
// Crear el objeto `io` para la comunicación en tiempo real
const io = new Server(httpServer);

// Implementación de enrutadores

const sessionRouter = require('./src/routers/session'); // Asegúrate de que la ruta sea correcta
const productsRouter = require('./src/routers/product');
const cartsRouter = require('./src/routers/carts');
const viewsRouter = require('./src/routers/viewsRouters');


// Rutas base de enrutadores
app.use('/api/sessions',sessionRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

//Apartir de aca - Mailing
app.get('/mail', async (req, res) => {
  try {
    // Modificamos la construcción de la ruta aquí
    let result = await transporter.sendMail({
      from: 'Test Coder <analauravillarruel@gmail.com>',
      to: 'analauravillarruel@gmail.com',
      subject: 'Test',
      html: `
        <div>
          <h1>Bienvenido al mejor Ecommerce!!</h1>
          <div>
            <h1>Aqui con una imagen!!</h1>
            <img src='cid:ecommerce' alt='Ecommerce Image' />
          </div>
        </div>
      `,
      attachments: [{
        filename: 'sitio-web-ecommerce.jpg',
        // Modificamos la construcción de la ruta aquí
        path: __dirname +  '/sitio-web-ecommerce.jpg', 'img', 'sitio-web-ecommerce.jpg'),

        cid: 'ecommerce',
      }],
    });

    res.send({ status: 'success', result: 'mail enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send({ status: 'error', error: 'Error al enviar el correo' });
  }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'analauravillarruel@gmail.com',
    pass: 'meab yufk elcg opcw',
  },
});
console.log(path.join(__dirname, '..', 'public', 'img', 'ecommerce', 'sitio-web-ecommerce.jpg'));
// Ruta de health check
app.get('/healthCheck', (req, res) => {
    res.json({
        status: 'running',
        date: new Date(),
    });
});

module.exports = io