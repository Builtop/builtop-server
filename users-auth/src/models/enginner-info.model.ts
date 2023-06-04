import { Schema, model } from 'mongoose';

import { IEngineerInfo, EngineerInfoSchema, InfoTypes } from '../../../common/index';

const engineerInfoSchema = new Schema<IEngineerInfo>(...EngineerInfoSchema);

export const EngineerInfo = model<IEngineerInfo>(InfoTypes.Engineer_Info, engineerInfoSchema);