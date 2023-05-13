import { Schema, model } from "mongoose";
import { CitySchema, ICity } from "../../../common/index";

const citySchema = new Schema<ICity>(...CitySchema);

export const City = model<ICity>("City", citySchema);
