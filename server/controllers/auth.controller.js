const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');


module.exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.getUserByUsername(username);
        if (existingUser.length) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const id = uuid();
        const result = await User.createUser({ username, password, id });
        console.log(result);

        const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET)

        res.status(200).json({ accessToken, refreshToken, id, username });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.getUserByUsername(username);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Credentials are incorrect.' });
        }
        const match = await User.comparePassword(password, user[0].password);
        if (!match) {
            return res.status(401).json({ message: 'Credentials are incorrect.' });
        }
        const accessToken = jwt.sign({ id: user[0].id, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ id: user[0].id, username }, process.env.REFRESH_TOKEN_SECRET)

        res.status(200).json({ accessToken, refreshToken, id: user[0].id, username });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'You are not logged in.' });
    }
    try {
        const blacklisted = await User.checkBlacklist(refreshToken);
        if (blacklisted.length) {
            return res.status(401).json({ message: 'You send depracated refresh token.' });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: decoded.id, username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports.logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'their is no refresh token.' });
    }
    try {
        await User.addToBlacklist(refreshToken);
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

