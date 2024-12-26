import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());



// routes import
import partyRouter from './routes/party.routes.js';
import poRouter from './routes/po.routes.js'

app.use('/api/v1/party', partyRouter);
app.use('/api/v1/po', poRouter);


export {app}