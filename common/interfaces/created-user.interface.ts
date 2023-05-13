import { ObjectId } from "mongoose";

export interface CreatedUser {
    _id:ObjectId | string,
    email: string,
    phoneNum: string,
}