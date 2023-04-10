import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { routeCatcher, errorHandler } from '../../common/index';

dotenv.config();

const app = express();

app.use(cors());

app.use('/api/users/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users APIs Version 1.0.0');
});

app.all('*', routeCatcher);

app.use(errorHandler);

export default app;