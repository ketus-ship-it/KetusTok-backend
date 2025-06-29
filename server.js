require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send("API KetusTok Backend");
});

// Importer routes (à créer)
const videosRouter = require('./routes/videos');
app.use('/api/videos', videosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));

const commentsRouter = require('./routes/comments');
app.use('/api/comments', commentsRouter);

const followRouter = require('./routes/follow');
const feedRouter = require('./routes/feed');

const messagesRouter = require('./routes/messages');
app.use('/api/messages', messagesRouter);

require("dotenv").config();
const cors = require("cors");
app.use(cors({ origin: '*' })); // ou spécifie l'origine exacte



app.use('/api/follow', followRouter);
app.use('/api/feed', feedRouter);const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app); // au lieu de app.listen
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('✅ Utilisateur connecté à Socket.IO');

  socket.on('send_message', (data) => {
    io.emit('receive_message', data); // broadcast message
  });

  socket.on('disconnect', () => {
    console.log('❌ Utilisateur déconnecté');
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log('🟢 Serveur backend + socket lancé')
);
