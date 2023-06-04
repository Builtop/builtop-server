import { Schema, model } from 'mongoose';

import { ICorporateBuyerInfo, CorporateBuyerInfoSchema, InfoTypes } from '../../../common/index';

const corporateBuyerInfoSchema = new Schema<ICorporateBuyerInfo>(...CorporateBuyerInfoSchema);

export const CorporateBuyerInfo = model<ICorporateBuyerInfo>(InfoTypes.CorporateBuyer_Info, corporateBuyerInfoSchema);