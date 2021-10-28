import express from 'express';
import cors from 'cors';
import fileRoute from './routers/File';
import rtmpRoute from './routers/RTMP';
import { init } from './models';

const app = express();

init();


app.use(express.json());

app.use(cors());

app.use('/file', fileRoute);
app.use('/rtmp', rtmpRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on ${PORT}`));