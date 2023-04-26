import { DBService } from '../../../common/index';

import { SupervisorInfo } from '../models/supervisor-info.model';

export class SupervisorInfoService extends DBService {
    static Model = SupervisorInfo;
}