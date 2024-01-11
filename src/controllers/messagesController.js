const MessageManager = require('../Dao/messagesManagerMongo');
const messageManager = new MessageManager();

const getMessages = async (req, res) => {
    try {
        const messages = await messageManager.getMessages();
        res.status(200).json({ status: 'success', payload: messages });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
}

const addMessage = async (req, res) => {
    try {
        const { user, content } = req.body;
        const newMessage = await messageManager.addMessage(user, content);
        res.status(201).json({ status: 'success', payload: newMessage });
    } catch (error) {
        console.error('Error al agregar el mensaje:', error);
        res.status(500).json({ error: 'Error al agregar el mensaje' });
    }
}

module.exports = {
    getMessages,
    addMessage
}