import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import * as fileController from './controllers/file.controller';

import { isAuth } from '../../common/index';

const router = express.Router();

router.post('/file', isAuth, multer().single('file'), fileController.uploadFile);

router.get('/:key', fileController.downloadFile);

// Version
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('File Manager APIs Version 1.0.0');
});

export default router;