import { Request, Response, NextFunction } from 'express';
import { startSession } from 'mongoose';
import { randomBytes } from 'crypto';

import { addSupervisorInput, approveAccountInput, activateAccountInput, deactivateAccountInput } from '../schemas/admin.schema';

import { UserService } from '../services/user.service';
import { SupervisorInfoService } from '../services/supervisor-info.service';

import { Validation, ProcessResult, IUser, User, SupervisorInfo, ValidationError, userStatus, infoType, roles, NotFoundError, RejectedActionError } from '../../../common/index';

export const addSupervisor = async (req: Request<{}, {}, addSupervisorInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();
    
    try {
        const existedSupervisor = await UserService.findByPhoneNum<IUser<SupervisorInfo>>(req.body.phoneNum);
        if (existedSupervisor) {
            throw new ValidationError('the phone number you have entered belongs to an existing user');
        }

        const supervisorInfo = await SupervisorInfoService.create<SupervisorInfo>({
            role: roles.Supervisor,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image ? req.body.image : 'No Image'
        }, session);

        const password = randomBytes(8).toString('hex');

        const newSupervisor = await UserService.create<User<any>>({
            phoneNum: req.body.phoneNum,
            password: password,
            privileges: [],
            infoType: infoType.SupervisorInfo,
            info: supervisorInfo._id,
            status: userStatus.Active
        }, session);

        const supervisor = await newSupervisor.populate('info');

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(<ProcessResult<IUser<SupervisorInfo>>> {
            success: true,
            data: supervisor
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

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
    const session = await startSession();
    session.startTransaction();
    
    try {
        Validation.isObjectId(req.params.id);

        const deletedUser = await UserService.deleteById<IUser<any>>(req.params.id, session);

        if (!deletedUser) {
            throw new NotFoundError('no user found with this ID');
        }

        if (deletedUser.info) {
            // [TODO] more code to be put in here once the supplier and buyer logic is done
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json(<ProcessResult<any>> {
            success: true
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        next(err);
    }
};