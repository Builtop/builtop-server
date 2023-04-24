import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service';

import { IUser, AdminInfo, SupervisorInfo, BuyerInfo, SupplierInfo, NotFoundError, BadRequestError, ProcessResult, infoType, userStatus, Validation } from '../../../common/index';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const users = await UserService.findAll<IUser<any>>({}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<any>[]>>{
            success: true,
            data: users
        });
    } catch (err) {
        next(err);
    }
};

export const getAllActiveUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const activeUsers = await UserService.findAll<IUser<any>>({ status: userStatus.Active }, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<any>[]>>{
            success: true,
            data: activeUsers
        });
    } catch (err) {
        next(err);
    }
};

export const getAllPendingUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const pendingUsers = await UserService.findAll<IUser<any>>({ status: userStatus.Pending }, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<any>[]>>{
            success: true,
            data: pendingUsers
        });
    } catch (err) {
        next(err);
    }
};

export const getAllInActiveUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.skip || !req.query.limit) {
            throw new BadRequestError('skip query value or limit query value is not defined');
        }

        const inActiveUsers = await UserService.findAll<IUser<any>>({ status: userStatus.InActive }, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<any>[]>>{
            success: true,
            data: inActiveUsers
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

        const admins = await UserService.findAll<IUser<AdminInfo>>({infoType: infoType.AdminInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<AdminInfo>[]>>{
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

        const supervisors = await UserService.findAll<IUser<SupervisorInfo>>({infoType: infoType.SupervisorInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<SupervisorInfo>[]>>{
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

        const buyers = await UserService.findAll<IUser<BuyerInfo>>({infoType: infoType.BuyerInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<BuyerInfo>[]>>{
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

        const suppliers = await UserService.findAll<IUser<SupplierInfo>>({infoType: infoType.SupplierInfo}, +req.query.skip, +req.query.limit);

        res.status(200).json(<ProcessResult<IUser<SupplierInfo>[]>>{
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

        const user = await UserService.findById<IUser<any>>(req.params.id);
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        res.status(200).json(<ProcessResult<IUser<any>>>{
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};