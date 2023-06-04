import { ObjectId, FilterQuery, ClientSession } from 'mongoose';

import { CorporateSupplierInfo } from '../models/corporate-supplier-info.model';

export class CorporateSupplierInfoService {
    static Model = CorporateSupplierInfo;

    static async create<T>(doc: T, session?: ClientSession) {
        const newDoc = new this.Model(doc);
        return await newDoc.save({ session });
    }

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).skip(skip).limit(limit);
    }

    static async findOne<T>(query: FilterQuery<T>) {
        return await this.Model.findOne<T>(query);
    }

    static async findById<T>(_id: string | ObjectId) {
        return await this.Model.findById<T>(_id);
    }

    static async deleteById<T>(_id: string | ObjectId, session?: ClientSession) {
        return await this.Model.findByIdAndRemove<T>(_id, { session });
    }
}