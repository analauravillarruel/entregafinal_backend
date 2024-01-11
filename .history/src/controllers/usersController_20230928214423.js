const UserManager = require('../Dao/UserManagerMongo');
const userManager = new UserManager();
const { createHash, isValidPassword } = require('../utils/passwordHash');

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        await userManager.createUser(userData);
        res.status(201).json({ status: 'success', message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}

const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authenticatedUser = await userManager.authenticateUser(email, password);
        res.status(200).json({ status: 'success', payload: authenticatedUser });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(401).json({ error: 'Error al autenticar usuario', message: error.message });
    }
}

const isAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const isAdmin = await userManager.isAdmin(email);
        res.status(200).json({ status: 'success', payload: isAdmin });
    } catch (error) {
        console.error('Error al verificar si el usuario es administrador:', error);
        res.status(500).json({ error: 'Error al verificar si el usuario es administrador' });
    }
}

module.exports = {
    createUser,
    authenticateUser,
    isAdmin
}