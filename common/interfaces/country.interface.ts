import { Document, ObjectId } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { lookupStatus } from "../enums/lookup-status.enum";
import { Latlng } from "./latlng";
import { EnAr } from "./enAr";

export interface CountryData {
  name: EnAr,
  latlng?: Latlng,
  createdUser: ObjectId | IUser<any>,
  image?: string,
  status: lookupStatus,
}

export interface ICountry extends Document, CountryData {}
