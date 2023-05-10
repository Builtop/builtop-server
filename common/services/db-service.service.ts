import { ObjectId, FilterQuery, Model, ClientSession } from 'mongoose';

export interface DBServiceEx {
   create<T>(doc: T, session?: ClientSession) : any;
   findAll<T>(Model: Model<any>,query: FilterQuery<T>, skip: number | undefined , limit: number | undefined ) : any;
   findBy<T>(Model: Model<any>,_id: string | ObjectId) : any;
   delete<T>(Model: Model<any>,_id: string | ObjectId, session?: ClientSession) : any;
}



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

    static async deleteById<T>(_id: string | ObjectId, session?: ClientSession) {
        return await this.Model.findByIdAndRemove<T>(_id, { session });
    }
}