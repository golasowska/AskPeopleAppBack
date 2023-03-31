import express, {json, Router} from "express";
import cors from 'cors';
import "express-async-errors";
import {config} from "./config/config";
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from 'express-rate-limit';
import {questionRouter} from "./routers/question.router";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

app.use('/questions', questionRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});