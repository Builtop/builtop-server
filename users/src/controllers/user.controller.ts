import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service';

import { User, AdminInfo, SupervisorInfo, BuyerInfo, SupplierInfo, NotFoundError, BadRequestError, ProcessResult, infoType, Validation } from '../../../common/index';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const users = await UserService.findAll<any>({}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<User<any>[]>>{
            success: true,
            data: users
        });
    } catch (err) {
        next(err);
    }
};

export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const admins = await UserService.findAll<AdminInfo>({infoType: infoType.AdminInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<User<AdminInfo>[]>>{
            success: true,
            data: admins
        });
    } catch (err) {
        next(err);
    }
};

export const getAllSupervisors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const supervisors = await UserService.findAll<SupervisorInfo>({infoType: infoType.SupervisorInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<User<SupervisorInfo>[]>>{
            success: true,
            data: supervisors
        });
    } catch (err) {
        next(err);
    }
};

export const getAllBuyers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const buyers = await UserService.findAll<BuyerInfo>({infoType: infoType.BuyerInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<User<BuyerInfo>[]>>{
            success: true,
            data: buyers
        });
    } catch (err) {
        next(err);
    }
};

export const getAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const suppliers = await UserService.findAll<SupplierInfo>({infoType: infoType.SupplierInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<User<SupplierInfo>[]>>{
            success: true,
            data: suppliers
        });
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Validation.isObjectId(req.params.id);

        const user = await UserService.findById<any>(req.params.id);
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        res.status(200).json(<ProcessResult<User<any>>>{
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};