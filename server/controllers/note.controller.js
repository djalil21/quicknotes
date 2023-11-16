const Note = require('../models/note.model');
const { v4: uuid } = require('uuid');


module.exports.getAll = async (req, res) => {
    try {
        const notes = await Note.getAll(req.user.id);
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const note = await Note.getOne(req.user.id, req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.createOne = async (req, res) => {
    try {
        req.body.id = uuid();
        const note = await Note.createOne(req.user.id, req.body);
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.updateOne(req.user.id, id, req.body);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.deleteOne = async (req, res) => {
    try {
        const note = await Note.deleteOne(req.user.id, req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}