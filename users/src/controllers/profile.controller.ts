import { Request, Response, NextFunction } from 'express';
import { startSession } from 'mongoose';

import { setupSupervisorInput, editAdminInput, editSupervisorInput, changePasswordInput } from '../schemas/profile.schema';

import { UserService } from '../services/user.service';
import { AdminInfoService } from '../services/admin-info.service';
import { SupervisorInfoService } from '../services/supervisor-info.service';

import { ProcessResult, PasswordManager, IUser, IAdminInfo, ISupervisorInfo, SupervisorInfo, infoType, roles, NotFoundError, ValidationError, RejectedActionError } from '../../../common/index';

export const setupSupervisorAccount = async (req: Request<{}, {}, setupSupervisorInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const supervisor = await UserService.findById<IUser<ISupervisorInfo>>(req.body._id as string);
        if (!supervisor || supervisor.infoType !== infoType.SupervisorInfo) {
            throw new NotFoundError('no supervisor found with this ID');
        }

        if (supervisor.info) {
            throw new RejectedActionError('this account has been setuped already');
        }

        const supervisorInfo = await SupervisorInfoService.create<SupervisorInfo>({
            role: roles.Supervisor,
            name: req.body.name,
            phoneNum: req.body.phoneNum,
            image: req.body.image? req.body.image : undefined
        }, session);

        supervisor.info = supervisorInfo._id;
        const updatedSupervisor = await (await supervisor.save({ session })).populate('info');

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(<ProcessResult<IUser<ISupervisorInfo>>> {
            success: true,
            data: updatedSupervisor
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        next(err);
    }
};

export const editAdminProfile = async (req: Request<{}, {}, editAdminInput>, res: Response, next: NextFunction) => {
    try {
        if (Object.keys(req.body).length <= 1) {
            throw new ValidationError('there is no data to edit');
        }

        const admin = await UserService.findById<IUser<IAdminInfo>>(req.body._id as string);

        if (!admin || admin.infoType !== infoType.AdminInfo) {
            throw new NotFoundError('no admin found with this ID');
        }

        if (!admin.info) {
            throw new RejectedActionError('this user has no info to be edited');
        }

        const adminInfo = await AdminInfoService.findById<IAdminInfo>((admin.info as IAdminInfo)._id);

        for (const key in req.body) {
            if (key !== '_id') {
                adminInfo[key] = (req.body as any)[key];
            }
        }
        await adminInfo.save();
        const editedAdmin = await admin.populate('info');

        res.status(200).json(<ProcessResult<IUser<IAdminInfo>>> {
            success: true,
            data: editedAdmin
        });
    } catch (err) {
        next(err);
    }
};

export const editSupervisorProfile = async (req: Request<{}, {}, editSupervisorInput>, res: Response, next: NextFunction) => {
    try {
        if (Object.keys(req.body).length <= 1) {
            throw new ValidationError('there is no data to edit');
        }

        const supervisor = await UserService.findById<IUser<ISupervisorInfo>>(req.body._id as string);

        if (!supervisor || supervisor.infoType !== infoType.SupervisorInfo) {
            throw new NotFoundError('no supervisor found with this ID');
        }

        if (!supervisor.info) {
            throw new RejectedActionError('this user has no info to be edited');
        }

        const supervisorInfo = await SupervisorInfoService.findById<ISupervisorInfo>((supervisor.info as ISupervisorInfo)._id);

        for (const key in req.body) {
            if (key !== '_id') {
                supervisorInfo[key] = (req.body as any)[key];
            }
        }
        await supervisorInfo.save();
        const editedSupervisor = await supervisor.populate('info');

        res.status(200).json(<ProcessResult<IUser<ISupervisorInfo>>> {
            success: true,
            data: editedSupervisor
        });
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req: Request<{}, {}, changePasswordInput>, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.findById<IUser<any>>(req.body._id as string);
        if (!user) {
            throw new NotFoundError('no user found with this ID');
        }

        await PasswordManager.compare(req.body.currentPassword, user.password, 'Profile');
        user.password = req.body.newPassword;
        const updatedUser = await user.save();

        res.status(200).json(<ProcessResult<IUser<any>>> {
            success: true,
            data: updatedUser
        });
    } catch (err) {
        next(err);
    }
};