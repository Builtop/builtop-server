import { ObjectId, FilterQuery, UpdateQuery, QueryOptions, Model } from 'mongoose';

export class DBService {
    static Model: Model<any>;

    static async create<T>(doc: T) {
        const newDoc = new this.Model(doc);
        return await newDoc.save();
    }

    static async findAll<T>(query: FilterQuery<T>, skip: number | undefined = 0, limit: number | undefined = 15) {
        return await this.Model.find<T>(query).skip(skip).limit(limit);
    }

    static async findById(_id: string | ObjectId) {
        return await this.Model.findById(_id);
    }

    static async update<T>(query: FilterQuery<T>, update: UpdateQuery<T>, options: QueryOptions) {
        return await this.Model.findOneAndUpdate(query, update, options);
    }

    static async deleteById(_id: string | ObjectId) {
        return await this.Model.findByIdAndRemove(_id);
    }
}