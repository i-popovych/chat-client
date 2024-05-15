import $baseAPI from '@/api/axios';

import { Project } from '../../../entities/Project';
import { User } from '../../../entities/User';

class UserService {
  profile(access_token?: string) {
    return $baseAPI.get<User>('/user/profile', {
      headers: { Authorization: access_token ? `Bearer ${access_token}` : null },
    });
  }

  getProjects() {
    return $baseAPI.get<Project[]>('/user/my-projects');
  }

  updateAvatar(avatarName: string) {
    return $baseAPI.put<User>('/user/avatar', { avatarName: avatarName });
  }
}

export const userService = new UserService();
