import { Request, Response, NextFunction } from "express";
import { addCountryInput } from "../validation-schemas/country-validation.schema";
import { CountriesService } from "../services/countries.service";
import { ObjectId, startSession } from "mongoose";
import {
  CountrySchema,
  ICountry,
  ProcessResult,
  UserSchema,
  lookupStatus,
} from "../../../common";
import { Latlng } from "../../../common/interfaces/latlng";
import { Country } from "../models/country.model";

export async function createCountryHandler(
  req: Request<{}, {}, addCountryInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const newCountry = await CountriesService.create({
      name: req.body.name ?? "",
      latlng: req.body?.latlng as Latlng,
      createdUser: req.body?.createdUser as ObjectId,
      status: req.body.status as lookupStatus,
    });

    res.status(201).json(<ProcessResult<ICountry>>{
      success: true,
      data: newCountry,
    });
  } catch (e) {
    next(e);
  }
}

export async function findByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const country = await CountriesService.findById(req.params.id);

    res.status(201).json(<ProcessResult<ICountry>>{
      success: true,
      data: country,
    });
  } catch (e) {
    next(e);
  }
}
