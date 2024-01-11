const express = require('express');
const { Router } = require('express');
const passport = require('passport');
const sessionsController = require('../controllers/');

// Crear un router de Express
const router = Router();

// Rutas de autenticación
router.post('/register', sessionsController.register.bind(sessionsController));
router.post('/login', sessionsController.login.bind(sessionsController));
router.get('/current', sessionsController.verifySession.bind(sessionsController), sessionsController.current.bind(sessionsController));
router.get('/unprotectedLogin', sessionsController.verifySession.bind(sessionsController), sessionsController.unprotectedLogin.bind(sessionsController));
router.get('/unprotectedCurrent', sessionsController.verifySession.bind(sessionsController), sessionsController.unprotectedCurrent.bind(sessionsController));

// Rutas de GitHub
const authRouter = express.Router(); // Definimos el router para las rutas de GitHub

authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/github-callback', passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}));

// Exportamos ambos routers
module.exports = {
    router: router,
    authRouter: authRouter
};

