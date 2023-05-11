import { Schema, model } from "mongoose";

import { CountrySchema, ICountry } from "../../../common/index";

const countrySchema = new Schema<ICountry>(...CountrySchema);

export const Country = model<ICountry>("Country", countrySchema);
