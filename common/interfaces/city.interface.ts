import { ObjectId } from "mongoose";
import { lookupStatus } from "../enums/lookup-status.enum";
import { ICountry } from "./country.interface";
import { CreatedUser } from "./created-user.interface";
import { Latlng } from "./latlng";
import { IUser } from "./user.interface";

export interface CityData {
    name: string,
    latlng?: Latlng,
    createdUser: CreatedUser,
    country:  ICountry, 
    status: lookupStatus,
  }
  
  export interface ICity extends Document, CityData {}
  