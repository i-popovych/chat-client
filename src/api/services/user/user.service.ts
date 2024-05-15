import { Project } from '../../../entities/Project';
import $baseAPI from '../../axios';
import { User } from './libs/types/user.type';

class UserService {
  profile(access_token?: string) {
    return $baseAPI.get<User>('/user/profile', {
      headers: { Authorization: access_token ? `Bearer ${access_token}` : null },
      
    });
  }

  getProjects() {
    return $baseAPI.get<Project[]>('/user/my-projects');
  }
}

export const userService = new UserService();
