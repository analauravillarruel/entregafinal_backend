
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

