import { ObjectId, FilterQuery, ClientSession } from 'mongoose';

import { User } from '../models/user.model';

export class UserService {
    static Model = User;

    static async create<T>(doc: T, session?: ClientSession) {
        const newDoc = new this.Model(doc);
        return await newDoc.save({ session });
    }

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).populate('info').skip(skip).limit(limit);
    }

    static async findOne<T>(query: FilterQuery<T>) {
        return await this.Model.findOne<T>(query).populate('info');
    }

    static async findById<T>(_id: string | ObjectId) {
        return await this.Model.findById<T>(_id).populate('info');
    }

    static async findByEmail<T>(email: string) {
        return await User.findOne<T>({ email }).populate('info');
    }

    static async findByPhoneNum<T>(phoneNum: string) {
        return await User.findOne<T>({ phoneNum }).populate('info');
    }
}