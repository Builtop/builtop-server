import { Schema, model } from "mongoose";

import { IExperience, lookupStatus } from "../../../common/index";

const experienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "User",
    },
    status: {
      type: String,
      required: true,
      enum: lookupStatus,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const Experience = model<IExperience>("Experience", experienceSchema);
