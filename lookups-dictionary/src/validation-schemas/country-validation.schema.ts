import * as yup from 'yup';
import { Types } from 'mongoose';

export const addCountrySchema = yup.object().shape({
    name: yup.string().min(3).required().ensure(),
});

export type addCountryInput = yup.InferType<typeof addCountrySchema>;
