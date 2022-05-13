import express from 'express';
import cors from 'cors';
import fileRoute from './routers/File';
import rtmpRoute from './routers/RTMP';
import appRoute from './routers/Application';
import db, { init } from './models';
import ws from 'ws';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

init();

app.use(express.json());

app.use(cors());

app.use(async (req, res, next) => {
  try {
    if (req.headers['secret-key']) {
      const secretKey = req.headers['secret-key'];
      const check = await db.application.findOne({ where: { secretKey: secretKey } });
      if(check) {
        res.locals.app = check.dataValues;
      } else {
        return res.status(401).json({ message: 'Invalid key' });
      }
      next();
    } else {
      next();
    }
  } catch(err) {
    next(err);
  }
});

app.use('/file', fileRoute);
app.use('/rtmp', rtmpRoute);
app.use('/app', appRoute);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, console.log(`Server started on ${PORT}`));

const wsServer = new ws.Server({
  server: httpServer,
});

wsServer.on('connection', (socket, req) => {
    
  // Ensure that the URL starts with '/rtmp/', and extract the target RTMP URL.
  let match;
  if ( !(match = req.url.match(/^\/rtmp\/(.*)$/)) ) {
    socket.terminate(); // No match, reject the connection.
    return;
  }
  
  const rtmpUrl = decodeURIComponent(match[1]);
  console.log('Target RTMP URL:', rtmpUrl);
  
  socket.on('message', msg => {
    console.log(msg)
  })

})