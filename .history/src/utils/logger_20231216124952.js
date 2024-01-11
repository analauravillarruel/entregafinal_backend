y al codigo que tenes simplemente agrega:
en app.js:
const addLogger = require('./logger')
// Middleware para el logger
app.use(addLogger)
app.get('/loggerTest', (req, res) => {
	//dev
	req.logger.debug('Prueba de Desarrollo')

	//prod 
	req.logger.info('Prueba en producción de consola')
	req.logger.error('Fallo prueba en producción de archivo')
	req.logger.warning('Fallo prueba en producción de archivo')

	res.send({ message: 'Prueba de logger, Correcta!' })
})

en los .env:
LOGGER_MODE=dev -> Esto para el .env.dev
LOGGER_MODE=prod -> Esto para el .env.prod

Eso de LOGGER_MODE -> llamalo como quieras.

en utils create un logger.js con:
// logger.js
const winston = require('winston');
const settings = require('../commands/command');
const logger_mode = settings.logger_mode;

const customLevelsOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		fatal: 'red',
		error: 'yellow',
		warning: 'blue',
		info: 'green',
		http: 'magenta',
		debug: 'cyan'
	}
};

const createLogger = (logger_mode) => {
	const transports = [];

	if (logger_mode === 'prod') {
		transports.push(new winston.transports.Console({ level: 'info' }));
		transports.push(new winston.transports.File({
			filename: './src/config/logs/errors.log', level: 'error', format: winston.format.combine(
				winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
				winston.format.json()
			)
		}));
	} else if (logger_mode === 'dev') {
		transports.push(new winston.transports.Console({ level: 'debug' }));
	}

	const logger = winston.createLogger({
		levels: customLevelsOptions.levels,
		transports: transports,
		format: winston.format.combine(
			winston.format.colorize({ colors: customLevelsOptions.colors }),
			winston.format.simple()
		),
	});
	return logger;
};

const logger = createLogger(logger_mode);

const addLogger = (req, res, next) => {
	req.logger = logger
	req.logger.http(${req.method} on ${req.url} - ${new Date().toLocaleDateString()})
	next()
}

module.exports = { addLogger }

a tu config.js agregale la nueva configuracion de entornos:
  logger_mode: process.env.LOGGER_MODE

create donde quieras una carpeta logs o no, pero si create un errors.log con variables asi:
