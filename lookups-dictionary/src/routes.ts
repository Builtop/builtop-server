import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import { validateSchema } from "../../common/index";
import {
  createCountryHandler,
  deleteHandler,
  findAllHandler,
  findAndUpdateHandler,
  findByIdHandler,
} from "./controllers/country.controller";
import { addCountrySchema } from "./validation-schemas/country-validation.schema";
import { addCitySchema } from "./validation-schemas/city-validation.schema";
import { createCityHandler, findAllCitiesHandler } from "./controllers/city.controller";

const router = express.Router();

// version
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Lookups-dictionary APIs Version 1.0.0");
});
// country operations
router.get("/api/country", json(), findAllHandler);
router.get("/api/country/:id", findByIdHandler);
router.post("/api/country", json(),validateSchema(addCountrySchema), createCountryHandler);
router.put("/api/country/:id", json(), findAndUpdateHandler);
router.delete("/api/country/:id", deleteHandler);
// cities operations
router.get("/api/city", json(), findAllCitiesHandler);
router.post("/api/city/:countryId", json(),validateSchema(addCitySchema), createCityHandler);

export default router;
