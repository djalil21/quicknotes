const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Note = require('../models/note.model');
module.exports.isLogged = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'You are not logged in.' });
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'You are not logged in.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(498).json({ message: 'invalide credentials.' });
        }
        req.user = user;
        next();
    });
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    const note = await Note.getOne(user.id, id)
    console.log(note);
    console.log(note.user_id);
    if (note.user_id !== user.id) {
        return res.status(403).json({ message: 'You are not authorized to do that.' });
    }
    next();
}