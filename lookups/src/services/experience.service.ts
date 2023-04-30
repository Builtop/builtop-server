import { ObjectId, FilterQuery } from 'mongoose';

import { DBService } from '../../../common/index';

import { Experience } from '../models/experience.model';

export class ExperienceService extends DBService {
    static Model = Experience;

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).populate('createdBy').skip(skip).limit(limit);
    }

    static async findById<T>(_id: string | ObjectId) {
        return await this.Model.findById<T>(_id).populate('createdBy');
    }
}