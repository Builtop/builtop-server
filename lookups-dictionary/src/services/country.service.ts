import { ClientSession } from "mongodb";
import  { FilterQuery, Model, Schema ,ObjectId, Types, UpdateQuery, QueryOptions} from "mongoose";
import { Country } from "../models/country.model";

export class CountryService {
  static Model = Country;
  static async create<T>(doc: T, session?: ClientSession | undefined) {
    const newDoc = new this.Model(doc);

    return await newDoc.save();
  }
  static async findById<T>(_id: string) {
    return await this.Model.findById<T>(_id);
  }
  static async delete<T>(_id: string, session?: ClientSession) {
    return await this.Model.findByIdAndDelete(_id, session);
  }

  static async findAll<T>(
    query: FilterQuery<T>,
    skip: number | undefined = 0,
    limit: number | undefined = 15
  ) {
    return await this.Model.find<T>(query)
      .skip(skip)
      .limit(limit);
  }


  static async findAndUpdate<T>(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions
) {
    return this.Model.findOneAndUpdate(query, update, options);
}


  
}
