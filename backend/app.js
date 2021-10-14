import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileRoute from './routers/File';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/file', fileRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on ${PORT}`));