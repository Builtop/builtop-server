import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use('/api/users/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users APIs Version 1.0.0');
});

export default app;