if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require('./routes/auth.route');
const noteRoute = require('./routes/note.route');
const db = require('./config/db');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/auth', authRoute);
app.use('/api/note', noteRoute);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
});



app.listen(port, () => console.log(`listening on port ${port}!`));