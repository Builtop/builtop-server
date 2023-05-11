import * as yup from "yup";
import { Types } from "mongoose";
import { Latlng } from "../../../common/interfaces/latlng";

export const addCountrySchema = yup.object().shape(
  {
    name: yup.string().when("name", (values) => {
      if (values[0] !== undefined) {
        return yup.string().min(3).required().ensure();
      } else {
        return yup.string().notRequired();
      }
    }),
    latlng: yup.object<Latlng>({
      lat: yup.string(),
      lng: yup.string(),
    }),
    createdUser: yup
      .mixed()
      .test(
        "valid objectId",
        "invalid objectId",
        (value: unknown) =>
          typeof value === "string" && Types.ObjectId.isValid(value)
      )
      .required(),
    status: yup.string().required(),
  },
  [["name", "name"]]
);

export type addCountryInput = yup.InferType<typeof addCountrySchema>;
