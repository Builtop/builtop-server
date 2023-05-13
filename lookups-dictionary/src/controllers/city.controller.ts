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
  CityData,
  ICity,
} from "../../../common";
import { Latlng } from "../../../common/interfaces/latlng";
import { Country } from "../models/country.model";
import { CreatedUser } from "../../../common/interfaces/created-user.interface";
import { CityService } from "../services/city.service";
import { addCityInput } from "../validation-schemas/city-validation.schema";
import { CountryService } from "../services/country.service";


export async function createCityHandler(
    req: Request<any, {}, addCityInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
        let country: any ;
      if (!req.params.countryId) {
          throw new NotFoundError('no country found with this ID');
        }else {
           country = await CountryService.findById(req.params.countryId);
          if (!country){
            throw new NotFoundError('no country found with this ID');
          }

      }
      
      const newCity = await CityService.create<CityData>({
        name: req.body.name ?? "",
        latlng: req.body?.latlng as Latlng,
        createdUser: req.body?.createdUser as CreatedUser,
        country:country,
        status: req.body.status as lookupStatus,
      });
  
      res.status(201).json(<ProcessResult<ICity>>{
        success: true,
        data: newCity,
      });
    } catch (e) {
      next(e);
    }
  }

  export async function findAllCitiesHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cityList = await CityService.findAll({});
  
      res.status(201).json(<ProcessResult<[ICity]>>{
        success: true,
        data: cityList,
      });
    } catch (e) {
      next(e);
    }
  }