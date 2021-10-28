import express from 'express';
import cors from 'cors';
import fileRoute from './routers/File';
import rtmpRoute from './routers/RTMP';
import db, { init } from './models';

const app = express();

db.sequelize.sync();

init();

app.use(express.json());

app.use(cors());

app.use('/file', fileRoute);
app.use('/rtmp', rtmpRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on ${PORT}`));