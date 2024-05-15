import { Project } from '../../../entities/Project';
import { User } from '../../../entities/User';
import $baseAPI from '../../axios';

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
