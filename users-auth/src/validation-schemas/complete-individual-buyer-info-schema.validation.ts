import * as yup from 'yup';
import { Types } from 'mongoose';

export const completeIndividualBuyerInfoSchema = yup.object().shape({
    userId: yup.string().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    name: yup.string().min(3).required(),
    image: yup.string().when('image', values => {
        if (values[0] !== undefined) {
            return yup.string().url().required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    city: yup.string().required(),
    address: yup.string().required(),
    national_ID: yup.string().required(),
    national_ID_Document: yup.string().required(),
    national_ID_Expiration_Date: yup.date().required(),
    payLaterOption: yup.boolean().required()
}, [
    [ 'image', 'image' ]
]);

export type completeIndividualBuyerInfoInput = yup.InferType<typeof completeIndividualBuyerInfoSchema>;