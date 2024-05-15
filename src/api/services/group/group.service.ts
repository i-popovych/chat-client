import { CreateGroupParams } from '@/api/services/group/libs/CreateGroupParams';

import $baseAPI from '../../axios';
import { GetGroupParams } from './libs/GetGroupParams';

class GroupService {
  getAllProjectGroups(params: GetGroupParams) {
    return $baseAPI.get('group', {
      params,
    });
  }

  getAllUserGroups(params: GetGroupParams) {
    return $baseAPI.get('group/user', {
      params,
    });
  }

  getAllGroupUsers(params: { groupId: number }) {
    return $baseAPI.get(`group/${params.groupId}/users`);
  }

  createGroup(params: CreateGroupParams) {
    return $baseAPI.post('group', params);
  }
}

export const groupService = new GroupService();
