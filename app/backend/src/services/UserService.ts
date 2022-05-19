import User from '../database/models/user';
import { IUniqueUser, IUserResponse } from '../interfaces';
import { UserModel } from '../models';

export default class UserService {
  public static async findByUnique(unique: IUniqueUser): Promise<User | null> {
    const user = await UserModel.findByUnique(unique);
    // if (!user) {
    //   throw new Error('User not found');
    // }
    return user;
  }

  public static serializer(user:User): IUserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
