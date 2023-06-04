import * as yup from 'yup';
import { Types } from 'mongoose';

export const completeCorporateSupplierInfoSchema = yup.object().shape({
    userId: yup.string().test('valid objectId', 'invalid objectId', (value: unknown) => 
        typeof value === 'string' && Types.ObjectId.isValid(value)
    ).required(),
    companyName: yup.string().min(3).required(),
    companyField: yup.string().required(),
    logo: yup.string().when('logo', values => {
        if (values[0] !== undefined) {
            return yup.string().url().required().ensure();
        } else {
            return yup.string().notRequired();
        }
    }),
    city: yup.string().required(),
    address: yup.string().required(),
    CRN_Number: yup.string().required(),
    CRN_Expiration_Date: yup.date().required(),
    CRN_Document: yup.string().required(),
    VAT_Cert_Document: yup.string().required(),
}, [
    [ 'logo', 'logo' ]
]);

export type completeCorporateSupplierInfoInput = yup.InferType<typeof completeCorporateSupplierInfoSchema>;