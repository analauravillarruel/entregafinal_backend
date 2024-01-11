const addLogger = require('./logger')
// Middleware para el logger
app.use(addLogger)
app.get('/loggerTest', (req, res) => {
	//dev
	req.logger.debug('Prueba de Desarrollo')

	//prod 
	req.logger.info('Pru