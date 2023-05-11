import { ClientSession } from "mongodb";
import { FilterQuery, Model, Schema } from "mongoose";
import { Country } from "../models/country.model";
import { DBService } from "../../../common";

export class CountriesService {
  static Model = Country;
  static async create<T>(doc: T, session?: ClientSession | undefined) {
    const newDoc = new this.Model(doc);

    return await newDoc.save();
  }
  static async findById<T>(_id: string) {
    return await this.Model.findById<T>(_id).populate({
      path: "createdUser",
      select: "_id phoneNum",
    });
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
      .populate({
        path: "createdUser",
        select: "_id phoneNum",
      })
      .skip(skip)
      .limit(limit);
  }
}
