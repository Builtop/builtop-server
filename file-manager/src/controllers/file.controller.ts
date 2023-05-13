import { Request, Response, NextFunction } from 'express';

import { S3 } from '../util/s3.util';

import { ProcessResult, AuthRequest, ValidationError, NotFoundError } from '../../../common/index';

export const uploadFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.body.path) {
            throw new ValidationError('the path is required.');
        }

        if (!req.file) {
            throw new ValidationError('there is no file to be upload');
        }

        const keyS3 = `${req.body.path.trim()}/${Date.now().toString().slice(-12)}`;
        const key = keyS3.split('/').join('%2F');

        S3.putObject({
            Body: req.file.buffer,
            Bucket: process.env.S3_BUKET_NAME as string,
            Key: keyS3,
        }, (err, data) => {
            if (err) {
                throw err
            } else if (data) {
                res.status(200).json(<ProcessResult<any>>{
                    success: true,
                    data: key
                });
            }
        });
    } catch (err) {
        next(err);
    }
};

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    S3.getObject({
        Bucket: process.env.S3_BUKET_NAME as string,
        Key: req.params.key
    }).createReadStream().on('error', err => {
        next(new NotFoundError(err.message));
    }).pipe(res);
};