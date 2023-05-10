import { Request, Response,NextFunction } from "express";
import { CountriesService } from "../services/countries.service";
import { addCountryInput } from "../validation-schemas/country-validation.schema";

export async function createCountryHandler(req: Request<{}, {}, addCountryInput>, res: Response, next: NextFunction) {

    const body = req.body;
    const post = await new CountriesService().create(body);

    return res.send(post);

}
