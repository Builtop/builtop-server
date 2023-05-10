import { ClientSession } from "mongodb";
import { FilterQuery, Model, Schema } from "mongoose";
import { DBServiceEx } from "../../../common";
import { Country } from "../models/country.model";

export class CountriesService implements DBServiceEx {
   
    findAll<T>(Model: Model<any, {}, {}, {}, any, any>, query: FilterQuery<T>, skip: number | undefined, limit: number | undefined) {
        throw new Error("Method not implemented.");
    }
    findBy<T>(Model: Model<any, {}, {}, {}, any, any>, _id: string | Schema.Types.ObjectId) {
        throw new Error("Method not implemented.");
    }
    delete<T>(Model: Model<any, {}, {}, {}, any, any>, _id: string | Schema.Types.ObjectId, session?: ClientSession | undefined) {
        throw new Error("Method not implemented.");
    }
     async create<T>(doc: T, session?: ClientSession | undefined) {
        try {
            const country = await Country.create(doc);
            return country;
        } catch (e: any) {
            throw new Error(e);
        }
    }

}