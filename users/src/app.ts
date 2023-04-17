import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { routeCatcher, errorHandler } from '../../common/index';

import routes from './routes';

const app = express();

app.use(cors());

app.use('/api/users', routes);

app.all('*', routeCatcher);

app.use(errorHandler);

export default app;