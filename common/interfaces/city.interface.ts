import { ObjectId } from "mongoose";
import { lookupStatus } from "../enums/lookups/lookup-status.enum";
import { ICountry } from "./country.interface";
import { CreatedUser } from "./created-user.interface";
import { EnAr } from "./enAr";
import { Latlng } from "./latlng";
import { IUser } from "./users/user.interface";

export interface CityData {
    name: EnAr,
    latlng?: Latlng,
    createdUser: CreatedUser,
    country:  ICountry, 
    status: lookupStatus,
  }
  
  export interface ICity extends Document, CityData {}
  