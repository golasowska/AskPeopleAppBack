import express, {json, Router} from "express";
import cors from 'cors';
import "express-async-errors";
import {config} from "./config/config";
import {handleError, ValidationError} from "./utils/errors";
// import rateLimit from 'express-rate-limit';
// import {adRouter} from "./routers/ad.router";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));

app.use(json());
// app.use(rateLimit({
//     windowMs: 5 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// }));

// const router = Router();

// router.use('/ad', adRouter);

// app.use('/api', router);

// app.get('/', async (req, res) => {
//     throw new ValidationError('Dammmn');
// });

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});