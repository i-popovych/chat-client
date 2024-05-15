import $baseAPI from '../../axios';
import { GetGroupParams } from './libs/GetGroupParams';

class GroupService {
  groupService(params: GetGroupParams) {
    return $baseAPI.get('group', {
      params,
    });
  }
}

export const groupService = new GroupService();
