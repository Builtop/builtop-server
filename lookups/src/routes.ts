import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Lookups APIs Version 1.0.0');
});

export default router;