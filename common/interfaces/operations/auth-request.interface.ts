import { Request } from 'express';
import { tokenData } from '../../types/token-data.type';

export interface AuthRequest<T = {}, S = any, U = any> extends Request<T, S, U> {
    tokenData?: tokenData
}