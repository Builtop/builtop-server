import { Request, Response, NextFunction } from 'express';
import { startSession } from 'mongoose';

import { completeCorporateBuyerInfoInput } from '../validation-schemas/complete-corporate-buyer-info-schema.validation';
import { completeCorporateSupplierInfoInput } from '../validation-schemas/complete-corporate-supplier-info-schema.validation';
import { completeIndividualBuyerInfoInput } from '../validation-schemas/complete-individual-buyer-info-schema.validation';
import { completeEngineerInfoInput } from '../validation-schemas/complete-engineer-info-schema.validation';

import { UserService } from '../services/user.service';
import { CorporateBuyerInfoService } from '../services/corporate-buyer-info.service';
import { CorporateSupplierInfoService } from '../services/corporate-supplier-info.service';
import { IndividualBuyerInfoService } from '../services/individual-buyer-info.service';
import { EngineerInfoService } from '../services/engineer-info.service';

import { ProcessResult, IUser, ICorporateBuyerInfo, CorporateBuyerInfo, ICorporateSupplierInfo, CorporateSupplierInfo, IIndividualBuyerInfo, IndividualBuyerInfo, IEngineerInfo, EngineerInfo, UserRoles, InfoTypes, JWT, NotFoundError, RejectedActionError, } from '../../../common/index';

export const completeCorporateBuyerInfo = async (req: Request<{}, {}, completeCorporateBuyerInfoInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const user = await UserService.findById<IUser<any>>(req.body.userId);
        if (!user) {
            throw new NotFoundError('no user found with ID');
        }

        if (!user.isPhoneNumValid) {
            throw new RejectedActionError('user must validate phone number first');
        }

        if (user.info || user.infoColl) {
            throw new RejectedActionError('user already have valid information');
        }

        const userInfo = await CorporateBuyerInfoService.create<CorporateBuyerInfo>({
            role: UserRoles.CorporateBuyer,
            companyName: req.body.companyName,
            logo: req.body.logo ? req.body.logo : 'NO IMAGE',
            city: req.body.city,
            address: req.body.address,
            CRN_Number: req.body.CRN_Number,
            CRN_Document: req.body.CRN_Document,
            CRN_Expiration_Date: req.body.CRN_Expiration_Date,
            VAT_Cert_Document: req.body.VAT_Cert_Document,
        }, session);

        user.infoColl = InfoTypes.CorporateBuyer_Info;
        user.info = userInfo._id;
        const updatedUser = await (await user.save({ session })).populate('info');

        if (req.body.payLaterOption) {
            // [TODO]: create user privilege request. "M.M"
        }

        await session.commitTransaction();
        session.endSession();

        const token = JWT.sign({
            _id: updatedUser._id,
            role: updatedUser.info.role,
            phoneNum: updatedUser.phoneNum,
            email: updatedUser.email,
            privileges: updatedUser.privileges
        });

        res.status(201).json(<ProcessResult<IUser<ICorporateBuyerInfo>>>{
            success: true,
            data: updatedUser,
            token: token
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        next(err);
    }
};

export const completeCorporateSupplierInfo = async (req: Request<{}, {}, completeCorporateSupplierInfoInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const user = await UserService.findById<IUser<any>>(req.body.userId);
        if (!user) {
            throw new NotFoundError('no user found with ID');
        }

        if (!user.isPhoneNumValid) {
            throw new RejectedActionError('user must validate phone number first');
        }

        if (user.info || user.infoColl) {
            throw new RejectedActionError('user already have valid information');
        }

        const userInfo = await CorporateSupplierInfoService.create<CorporateSupplierInfo>({
            role: UserRoles.CorporateSupplier,
            companyName: req.body.companyName,
            companyField: req.body.companyField,
            logo: req.body.logo ? req.body.logo : 'NO IMAGE',
            city: req.body.city,
            address: req.body.address,
            CRN_Number: req.body.CRN_Number,
            CRN_Document: req.body.CRN_Document,
            CRN_Expiration_Date: req.body.CRN_Expiration_Date,
            VAT_Cert_Document: req.body.VAT_Cert_Document,
        }, session);

        user.infoColl = InfoTypes.CorporateSupplier_Info;
        user.info = userInfo._id;
        const updatedUser = await (await user.save({ session })).populate('info');

        await session.commitTransaction();
        session.endSession();

        const token = JWT.sign({
            _id: updatedUser._id,
            role: updatedUser.info.role,
            phoneNum: updatedUser.phoneNum,
            email: updatedUser.email,
            privileges: updatedUser.privileges
        });

        res.status(201).json(<ProcessResult<IUser<CorporateSupplierInfo>>>{
            success: true,
            data: updatedUser,
            token: token
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        next(err);
    }
};

export const completeIndividualBuyerInfo = async (req: Request<{}, {}, completeIndividualBuyerInfoInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const user = await UserService.findById<IUser<any>>(req.body.userId);
        if (!user) {
            throw new NotFoundError('no user found with ID');
        }

        if (!user.isPhoneNumValid) {
            throw new RejectedActionError('user must validate phone number first');
        }

        if (user.info || user.infoColl) {
            throw new RejectedActionError('user already have valid information');
        }

        const userInfo = await IndividualBuyerInfoService.create<IndividualBuyerInfo>({
            role: UserRoles.IndividualBuyer,
            name: req.body.name,
            image: req.body.image ? req.body.image : 'NO IMAGE',
            city: req.body.city,
            address: req.body.address,
            national_ID: req.body.national_ID,
            national_ID_Document: req.body.national_ID_Document,
            national_ID_Expiration_Date: req.body.national_ID_Expiration_Date
        }, session);

        user.infoColl = InfoTypes.IndividualBuyer_Info;
        user.info = userInfo._id;
        const updatedUser = await (await user.save({ session })).populate('info');

        if (req.body.payLaterOption) {
            // [TODO]: create user privilege request. "M.M"
        }

        await session.commitTransaction();
        session.endSession();

        const token = JWT.sign({
            _id: updatedUser._id,
            role: updatedUser.info.role,
            phoneNum: updatedUser.phoneNum,
            email: updatedUser.email,
            privileges: updatedUser.privileges
        });

        res.status(201).json(<ProcessResult<IUser<IIndividualBuyerInfo>>>{
            success: true,
            data: updatedUser,
            token: token
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        next(err);
    }
};

export const completeEngineerInfo = async (req: Request<{}, {}, completeEngineerInfoInput>, res: Response, next: NextFunction) => {
    const session = await startSession();
    session.startTransaction();

    try {
        const user = await UserService.findById<IUser<any>>(req.body.userId);
        if (!user) {
            throw new NotFoundError('no user found with ID');
        }

        if (!user.isPhoneNumValid) {
            throw new RejectedActionError('user must validate phone number first');
        }

        if (user.info || user.infoColl) {
            throw new RejectedActionError('user already have valid information');
        }

        const userInfo = await EngineerInfoService.create<EngineerInfo>({
            role: UserRoles.Engineer,
            name: req.body.name,
            image: req.body.image ? req.body.image : 'NO IMAGE',
            city: req.body.city,
            address: req.body.address,
            major: req.body.major,
            National_ID: req.body.National_ID,
            National_ID_Document: req.body.National_ID_Document,
            National_ID_Expiration_Date: req.body.National_ID_Expiration_Date,
            Engineering_Cert_Document: req.body.Engineering_Cert_Document,
            SCE_Cert_Document: req.body.SCE_Cert_Document,
            Resume_Document: req.body.Resume_Document
        }, session);

        user.infoColl = InfoTypes.Engineer_Info;
        user.info = userInfo._id;
        const updatedUser = await (await user.save({ session })).populate('info');

        await session.commitTransaction();
        session.endSession();

        const token = JWT.sign({
            _id: updatedUser._id,
            role: updatedUser.info.role,
            phoneNum: updatedUser.phoneNum,
            email: updatedUser.email,
            privileges: updatedUser.privileges
        });

        res.status(201).json(<ProcessResult<IUser<EngineerInfo>>>{
            success: true,
            data: updatedUser,
            token: token
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        
        next(err);
    }
};