
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

const config = require('../src/utils/config');
const DB = require('../src/db/singleton');

const nodemailer = require('nodemailer');
const twilio= require('twilio');
// const addLogger = require('./src/utils/logger')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const initializePassport = require('../src/Config/passport.config');


const program = new Command()

program
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse()

const options = program.opts()

dotenv.config({
  path: `.env.${options.mode}`
})

const settings =config()

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
app.set('views', __dirname + '/views');


// Crear el servidor HTTP
const httpServer = app.listen(8080, () => {
  console.log(`Servidor express escuchando en el puerto 8080`);
});
// Crear el objeto `io` para la comunicación en tiempo real
const io = new Server(httpServer);

// Implementación de enrutadores

const sessionRouter = require('./routers/session'); // Asegúrate de que la ruta sea correcta
const productsRouter = require('./routers/product');
const cartsRouter = require('./routers/carts');
const viewsRouter = require('./routers/viewsRouters');


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

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/sms', async (req, res) => {
  try {
    let result = await client.messages.create({
      body: 'Este es un mensaje de Ecommerce',
      from: process.env.TWILIO_PHONE_NUMBER,
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

//Middleware de Logger


// app.use(addLogger)
app.get('/loggerTest', (req, res) => {
	//dev
	req.logger.debug('Prueba de Desarrollo')

	//prod 
	req.logger.info('Prueba en producción de consola')
	req.logger.error('Fallo prueba en producción de archivo')
	req.logger.warning('Fallo prueba en producción de archivo')

	res.send({ message: 'Prueba de logger, Correcta!' })
})


// Ruta de health check
app.get('/healthCheck', (req, res) => {
    res.json({
        status: 'running',
        date: new Date(),
    });
});

module.exports = io