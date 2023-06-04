import { Schema, model } from 'mongoose';

import { ICorporateSupplierInfo, CorporateSupplierInfoSchema, InfoTypes } from '../../../common/index';

const corporateSupplierInfoSchema = new Schema<ICorporateSupplierInfo>(...CorporateSupplierInfoSchema);

export const CorporateSupplierInfo = model<ICorporateSupplierInfo>(InfoTypes.CorporateSupplier_Info, corporateSupplierInfoSchema);