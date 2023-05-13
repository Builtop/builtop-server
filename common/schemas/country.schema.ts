import { Schema } from "mongoose";

import { infoType } from "../enums/info-type.enum";
import { userStatus } from "../enums/user-status.enum";
import { UserSchema } from "./user.schema";
import { Latlng } from "../interfaces/latlng";
import { CreatedUser } from "../interfaces/created-user.interface";

export const CountrySchema = [
  {
    name: {
      type: String,
      required: true,
    },
    latlng: {
      type: Object as () => Latlng,
    },
    createdUser: {
      type: Object as () => CreatedUser,
      required: true,
    },
    image:{
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: userStatus,
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
];
