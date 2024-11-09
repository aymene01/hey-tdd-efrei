import express from 'express';
import bodyParser from 'body-parser';
import chatRoutes from '../routes/chat.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/chat', chatRoutes);

app.get('/ping', (req, res) => res.send('pong'));

app.set('port', 3000)

export default app;
