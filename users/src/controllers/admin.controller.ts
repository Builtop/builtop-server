import { Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

import { addSupervisorInput, approveAccountInput, activateAccountInput, deactivateAccountInput } from '../schemas/admin.schema';

import { UserService } from '../services/user.service';

import { Validation, ProcessResult, IUser, User, SupervisorInfo, ValidationError, userStatus, infoType, NotFoundError, RejectedActionError } from '../../../common/index';

export const addSupervisor = async (req: Request<{}, {}, addSupervisorInput>, res: Response, next: NextFunction) => {
    try {
        const existedSupervisor = await UserService.findByEmail<IUser<SupervisorInfo>>(req.body.email);
        if (existedSupervisor) {
            throw new ValidationError('the email address you have entered belongs to an existing user');
        }

        const password = randomBytes(8).toString('hex');

        const newSupervisor = await UserService.create<User<any>>({
            email: req.body.email,
            password: password,
            privileges: [],
            infoType: infoType.SupervisorInfo,
            status: userStatus.Active
        });

        res.status(201).json(<ProcessResult<IUser<SupervisorInfo>>> {
            success: true,
            data: newSupervisor
        });
    } catch (err) {
        next(err);
    }
};

export const approveAccount = async (req: Request<{}, {}, approveAccountInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findById<IUser<any>>(req.body._id as string);
        
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        if (user.status !== userStatus.Pending) {
            throw new RejectedActionError('this account has been approved already');
        }

        user.status = userStatus.Active;
        const approvedUser = await user.save();

        res.status(200).json(<ProcessResult<IUser<any>>> {
            success: true,
            data: approvedUser
        });
    } catch (err) {
        next(err);
    }
};

export const activateAccount = async (req: Request<{}, {}, activateAccountInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findById<IUser<any>>(req.body._id as string);
        
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        if (user.status !== userStatus.InActive) {
            throw new RejectedActionError('rejected action, this account is at active state or in pending state');
        }

        user.status = userStatus.Active;
        const activatedUser = await user.save();

        res.status(200).json(<ProcessResult<IUser<any>>> {
            success: true,
            data: activatedUser
        });
    } catch (err) {
        next(err);
    }
};

export const deactivateAccount = async (req: Request<{}, {}, deactivateAccountInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findById<IUser<any>>(req.body._id as string);
        
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        if (user.status !== userStatus.Active) {
            throw new RejectedActionError('rejected action, this account is at inactive state or in pending state');
        }

        user.status = userStatus.InActive;
        const deactivatedUser = await user.save();

        res.status(200).json(<ProcessResult<IUser<any>>> {
            success: true,
            data: deactivatedUser
        });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Validation.isObjectId(req.params.id);

        await UserService.deleteById(req.params.id);

        res.status(200).json(<ProcessResult<any>> {
            success: true
        });
    } catch (err) {
        next(err);
    }
};