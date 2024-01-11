const express = require('express');
const session = require('express-session');
const {Command} = require ('commander');
const dotenv =require('dotenv');
dotenv.config();
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const passport = require('passport')
const flash =require('connect-flash')
const config = require('./src/utils/config');
const DB = require('./src/db/singleton');
const path = require('path');
const nodemailer = require('nodemailer');
const twilio= require('twilio');
const addLogger = require('./src/utils/logger')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

// Inicializar estrategias
const initializeGitHubStrategy = require('./src/Config/githubStrategy');
const initializeLocalRegisterStrategy = require('./src/Config/localRegisterStrategy');
const initializeLocalLoginStrategy = require('./src/Config/localLoginStrategy');
const { initializeJWTStrategy, passportCall } = require('./src/Config/jwtStrategy');


initializeGitHubStrategy();
initializeLocalRegisterStrategy();
initializeLocalLoginStrategy();
initializeJWTStrategy();


const initializePassport = require('./src/Config/passport.config');


const program = new Command()

program
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse()

const options = program.opts()

dotenv.config({
  path: `.env.${options.mode}`
})

// console.log({options})
// console.log(process.env)

const settings = config()

const dbConnection = DB.getConnection(process.env)



DB.getConnection(settings)

const app = express()
app.use(addLogger);

app.use(cookieParser(process.env.COOKIE_SECRET));
const secretSession = process.env.SESSION_SECRET;

app.use(session({
  secret: secretSession,
  resave: false,
  saveUninitialized: false,
}));

initializePassport(passport);
//app.use(passportCall('jwt'));//

app.use(passport.initialize());
app.use(passport.session()); 




// Middleware para el manejo de JSON y datos enviados por formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash())
// app.use(addLogger);
// Pasa el objeto Passport como argumento


// Configuración handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

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
app.set('views', path.join(__dirname, 'src', 'views'));


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
const userRouter = require


// Rutas base de enrutadores
app.use('/api/sessions',sessionRouter.router);
app.use('/api/users', userRouter);
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
        path: './src/public/img/sitio-web-ecommerce.jpg',

        cid: 'ecommerce',
      }],
    });

    res.send({ status: 'success', result: 'mail enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send({ status: 'error', error: 'Error al enviar el correo' });
  }
});

const TWILIO_ACCOUNT_SID = 'AC4500c19a6cfdbe055a4dc9f28e324f37';
const TWILIO_AUTH_TOKEN = 'd186024d3f98c7ed53467cb5201d4518';
const TWILIO_PHONE_NUMBER = '+54 261 4724 976';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get('/sms', async (req, res) => {
  try {
    let result = await client.messages.create({
      body: 'Este es un mensaje de Ecommerce',
      from: TWILIO_PHONE_NUMBER,
      to: '+54 261 4724 976',
    });
    res.send({ status: 'success', result: 'Mensaje enviado' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).send({ status: 'error', error: 'Error al enviar el mensaje' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Ruta de health check
app.get('/healthCheck', (req, res) => {
    res.json({
        status: 'running',
        date: new Date(),
    });
});

module.exports = io