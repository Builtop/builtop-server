import { Schema, model } from 'mongoose';

import { IIndividualBuyerInfo, IndividualBuyerInfoSchema, InfoTypes } from '../../../common/index';

const individualBuyerInfoSchema = new Schema<IIndividualBuyerInfo>(...IndividualBuyerInfoSchema);

export const IndividualBuyerInfo = model<IIndividualBuyerInfo>(InfoTypes.IndividualBuyer_Info, individualBuyerInfoSchema);