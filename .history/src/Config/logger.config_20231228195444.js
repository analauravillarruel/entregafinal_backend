const createLogger = (logger_mode) => {
	const transports = [];

	if (logger_mode === 'prod') {
		transports.push(new winston.transports.Console({ level: 'info' }));
		transports.push(new winston.transports.File({
			filename: './src/con, level: 'error', format: winston.format.combine(
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
  req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
}

module.exports = { addLogger }