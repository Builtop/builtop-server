import { Document, ObjectId } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { lookupStatus } from "../enums/lookup-status.enum";
import { Latlng } from "./latlng";

export interface CountryData {
  name: string;
  latlng: Latlng;
  createdUser: ObjectId;
  status: lookupStatus;
}

export interface ICountry extends Document, CountryData {}
