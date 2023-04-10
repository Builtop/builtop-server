import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { AxiosError } from 'axios';
import { routeCatcher, ProcessResult } from '../../common/index';

dotenv.config();

import router from './router/router';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(router);

app.all('*', routeCatcher);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    let errorResponse: ProcessResult<undefined> = {
        success: false,
        innerError: error.message
    };
    let statusCode: number = 500;

    if (error instanceof AxiosError) {
        if (error.response) {
            errorResponse = error.response.data;
            statusCode = error.response.status;
        }
    }

    return res.status(statusCode).json(errorResponse);
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`API GATEWAY is up and running on port ${process.env.PORT || 8080}`);
});