import { Request, Response, NextFunction } from 'express';

import { UserService } from '../services/user.service';

import { infoType, userStatus, ProcessResult, IUser } from '../../../common/index';

export const getUsersStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.findAll<IUser<any>>({});

        const data = {
            usersNum: users.length,
            activeUsersnNum: users.filter(user => user.status === userStatus.Active).length,
            pendingUsersnNum: users.filter(user => user.status === userStatus.Pending).length,
            inActiveUsersnNum: users.filter(user => user.status === userStatus.InActive).length,
            adminsNum: users.filter(user => user.infoType === infoType.AdminInfo).length,
            supervisorsNum: users.filter(user => user.infoType === infoType.SupervisorInfo).length,
            buyersNum: users.filter(user => user.infoType === infoType.BuyerInfo).length,
            suppliersNum: users.filter(user => user.infoType === infoType.SupplierInfo).length,
        }

        res.status(200).json(<ProcessResult<any>>{
            success: true,
            data: data
        });
    } catch (err) {
        next(err);
    }
};