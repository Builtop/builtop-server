import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { BadRequestError } from '../../../common/index';

const registry = require('./registry.json');

const router = express.Router();

router.all('/api/:serviceName/*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.serviceName) {
            throw new BadRequestError('invalid URL');
        }

        let isValidServiceName = false;

        for (const service in registry.services) {
            if (service === req.params.serviceName) {
                isValidServiceName = true;
                break;
            }
        }

        if (!isValidServiceName) {
            throw new BadRequestError('invalid service name');
        }

        if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'GET' && req.method !== 'DELETE') {
            throw new BadRequestError('invalid HTTP method');
        }

        if (req.method === 'POST') {
            const response = await axios.post(
                `${registry.services[req.params.serviceName].url}${req.originalUrl}`,
                req.body,
                { headers: req.headers }
            );
            return res.status(response.status).json(response.data);
        }

        if (req.method === 'PUT') {
            const response = await axios.put(
                `${registry.services[req.params.serviceName].url}${req.originalUrl}`,
                req.body,
                { headers: req.headers }
            );
            return res.status(response.status).json(response.data);
        }

        if (req.method === 'GET') {
            const response = await axios.get(
                `${registry.services[req.params.serviceName].url}${req.originalUrl}`,
                { headers: req.headers }
            );
            return res.status(response.status).json(response.data);
        }

        if (req.method === 'DELETE') {
            const response = await axios.delete(
                `${registry.services[req.params.serviceName].url}${req.originalUrl}`,
                { headers: req.headers }
            );
            return res.status(response.status).json(response.data);
        }
    } catch (err) {
        next(err);
    }
});

export default router;