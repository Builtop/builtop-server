import { ObjectId, FilterQuery } from 'mongoose';

import { DBService } from '../../../common/index';

import { User } from '../models/user.model';

export class UserService extends DBService {
    static Model = User;

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).populate('info').skip(skip).limit(limit);
    }

    static async findById<T>(_id: string | ObjectId) {
        return await this.Model.findById<T>(_id).populate('info');
    }

    static async findByPhoneNum<T>(phoneNum: string) {
        return await User.findOne<T>({ phoneNum }).populate('info');
    }
}