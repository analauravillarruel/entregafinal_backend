const userModel = require('../Dao/models/userModel');
const { generateToken } = require('../utils/jwt');
const { createHash, isValidPassword } = require('../utils/passwordHash');

const register = async (req, res) => {
    try {
        const { name, apellido, email, password } = req.body;
        if (!name || !apellido || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(401).json({ error: 'El usuario ya existe' });
        }

        const hashedPassword = createHash(password);

        const newUser = {
            name,
            apellido,
            email,
            password: hashedPassword,
            username: email,
            isAdmin: req.body.isAdmin || false,
        };

        await userModel.create(newUser);

        const token = generateToken({ email }); 

        return res.status(201).json({ status: 'success', token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user || !isValidPassword(password, user.password)) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = generateToken({ email }); // Genera un token JWT

        return res.json({ status: 'success', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const recoveryPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'El usuario no existe en el sistema' });
        }

        const newPassword = createHash(password);
        await userModel.updateOne({ email: user.email }, { password: newPassword });

        return res.redirect('/login');
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    register,
    login,
    recoveryPassword
}