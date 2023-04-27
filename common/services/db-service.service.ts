import { ObjectId, FilterQuery, Model, ClientSession } from 'mongoose';

export class DBService {
    static Model: Model<any>;

    static async create<T>(doc: T, session?: ClientSession) {
        const newDoc = new this.Model(doc);
        return await newDoc.save({ session });
    }

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).skip(skip).limit(limit);
    }

    static async findById<T>(_id: string | ObjectId) {
        return await this.Model.findById(_id);
    }

    static async deleteById(_id: string | ObjectId) {
        return await this.Model.findByIdAndRemove(_id);
    }
}