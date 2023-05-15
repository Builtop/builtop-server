import { Schema } from "mongoose";

import { infoType } from "../enums/info-type.enum";
import { userStatus } from "../enums/user-status.enum";
import { UserSchema } from "./user.schema";
import { Latlng } from "../interfaces/latlng";
import { CreatedUser } from "../interfaces/created-user.interface";
import { EnAr } from "../interfaces/enAr";

export const CitySchema = [
  {
    name: {
      type: Object as () => EnAr,
      required: true,
    },
    latlng: {
      type: Object as () => Latlng,
    },
    createdUser: {
      type: Object as () => CreatedUser,
      required: true,
    },

    country : {
        type: Schema.Types.ObjectId,
        ref: "Country",
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
