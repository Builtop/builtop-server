import { ObjectId, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

import * as Model from '../models/user.model';
import { IUser, User } from '../../../common/index';

export class UserService {
    static async findAll<T>(query: FilterQuery<IUser<ObjectId>>, skip: number = 0, limit: number = 15) {
        return await Model.User.find<IUser<T | undefined>>(query).populate('info').skip(skip).limit(limit);
    }

    static async findByEmail<T>(email: string) {
        return await Model.User.findOne<IUser<T | undefined>>({ email }).populate('info');
    }

    static async findById<T>(_id: string | ObjectId) {
        return await Model.User.findById<IUser<T | undefined>>(_id).populate('info');
    }

    static async create(doc: User<ObjectId>) {
        const newUser = new Model.User(doc);
        return await newUser.save();
    }

    static async update(query: FilterQuery<IUser<ObjectId>>, update: UpdateQuery<IUser<ObjectId>>, options: QueryOptions) {
        return await Model.User.findOneAndUpdate(query, update, options);;
    }

    static async deleteById<T>(_id: string | ObjectId) {
        return await Model.User.findByIdAndRemove<IUser<T | undefined>>(_id).populate('info');
    }
}