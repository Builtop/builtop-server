import { Request, Response, NextFunction } from "express";
import { addCountryInput } from "../validation-schemas/country-validation.schema";
import { FilterQuery, isValidObjectId, ObjectId, startSession } from "mongoose";
import {
  CountrySchema,
  ICountry,
  ProcessResult,
  UserSchema,
  lookupStatus,
  NotFoundError,
  BadRequestError,
} from "../../../common";
import { Latlng } from "../../../common/interfaces/latlng";
import { Country } from "../models/country.model";
import { CreatedUser } from "../../../common/interfaces/created-user.interface";
import { CountryService } from "../services/country.service";

export async function createCountryHandler(
  req: Request<{}, {}, addCountryInput>,
  res: Response,
  next: NextFunction
) {
  try {
    // TODO FILL USER DTA FROM TOKEN
    const newCountry = await CountryService.create({
      name: req.body.name ?? "",
      latlng: req.body?.latlng as Latlng,
      createdUser: req.body?.createdUser as CreatedUser,
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
    const country = await CountryService.findById(req.params.id);

    if (!country){
      throw new NotFoundError('no country found with this ID');
    }

    res.status(201).json(<ProcessResult<ICountry>>{
      success: true,
      data: country,
    });
  } catch (e) {
    next(e);
  }
}
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const country = await CountryService.delete(req.params.id);
    if (!country){
      throw new NotFoundError('no country found with this ID');
    }

    res.status(201).json(<ProcessResult<ICountry>>{
      success: true,
      data: country,
    });
  } catch (e) {
    if (!req.params.id && isValidObjectId(req.params.id)) {
      throw new NotFoundError('no country found with this ID');
    }else {
      next(e);
    }
  }
} 

export async function findAllHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    if (!req.query.skip || !req.query.limit) {
      throw new BadRequestError('skip query value or limit query value is not defined');
  }
    const countryList = await CountryService.findAll<ICountry>({},+req.query.skip, +req.query.limit);
    res.status(201).json(<ProcessResult<[ICountry]>>{
      success: true,
      data: countryList,
    });
  } catch (e) {
    next(e);
  }
}

export async function findAndUpdateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let id = req.params.id;
    const country = await CountryService.findAndUpdate({_id: id},req.body,{new : true});
    if (!country){
      throw new NotFoundError('no country found with this ID');
    }

    res.status(201).json(<ProcessResult<ICountry>>{
      success: true,
      data: country,
    });
  } catch (e) {
    if (!req.params.id && isValidObjectId(req.params.id)) {
      throw new NotFoundError('no country found with this ID');
    }else {
      next(e);
    }
  }
}
