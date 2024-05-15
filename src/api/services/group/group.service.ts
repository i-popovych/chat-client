import { CreateGroupParams } from '@/api/services/group/libs/CreateGroupParams';

import $baseAPI from '../../axios';
import { GetGroupParams } from './libs/GetGroupParams';

class GroupService {
  getAllProjectGroups(params: GetGroupParams) {
    return $baseAPI.get('group', {
      params,
    });
  }

  createGroup(params: CreateGroupParams) {
    return $baseAPI.post('group', params);
  }
}

export const groupService = new GroupService();
