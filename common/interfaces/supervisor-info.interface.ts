import { Document } from 'mongoose';

import { roles } from '../enums/roles.enum';

export interface SupervisorInfo {
    role: roles.Supervisor,
    name: string,
    image?: string
}

export interface ISupervisorInfo extends Document, SupervisorInfo {};