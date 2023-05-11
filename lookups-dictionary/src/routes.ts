import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import { validateSchema } from "../../common/index";
import {
  createCountryHandler,
  deleteHandler,
  findAllHandler,
  findByIdHandler,
} from "./controllers/country.controller";
import { addCountrySchema } from "./validation-schemas/country-validation.schema";

const router = express.Router();

// version
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Lookups-dictionary APIs Version 1.0.0");
});
// country operations
router.post("/api/country", json(), createCountryHandler);
router.get("/api/country", json(), findAllHandler);
router.get("/api/country/:id", findByIdHandler);
router.delete("/api/country/:id", deleteHandler);

export default router;
