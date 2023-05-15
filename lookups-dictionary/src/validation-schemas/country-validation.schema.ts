import * as yup from "yup";
import { Types } from "mongoose";
import { Latlng } from "../../../common/interfaces/latlng";
import { CreatedUser } from "../../../common/interfaces/created-user.interface";
import { EnAr } from "../../../common/interfaces/enAr";

export const addCountrySchema = yup.object().shape(
  {
    name:yup.object<EnAr>().shape({
      en: yup.string(),
      ar: yup.string(),
    }),
    latlng: yup.object<Latlng>().shape({
      lat: yup.string(),
      lng: yup.string(),
    }),
    createdUser: yup.object<CreatedUser>().shape({
      _id: yup
        .mixed()
        .test(
          "valid objectId",
          "invalid objectId",
          (value: unknown) =>
            typeof value === "string" && Types.ObjectId.isValid(value)
        )
        .required(),
      email: yup.string().required(),
      phoneNum: yup.string().required(),
    }),
    image: yup.string(),
    status: yup.string().required(),
  },
  [["name", "name"]]
);

export type addCountryInput = yup.InferType<typeof addCountrySchema>;
