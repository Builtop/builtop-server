import { DBService } from '../../../common/index';

import { AdminInfo } from '../models/admin-info.model';

export class AdminInfoService extends DBService {
    static Model = AdminInfo;
}