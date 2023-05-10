import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import { validateSchema } from '../../common/index';


const router = express.Router();



// version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Users Auth APIs Version 1.0.0');
});

export default router;