import $baseAPI from '../../axios';
import { User } from './libs/user.type';

class UserService {
  profile(access_token?: string) {
    return $baseAPI.get<User>('/user/profile', {
      headers: { Authorization: access_token ? `Bearer ${access_token}` : null },
    });
  }
}

export const userService = new UserService();
