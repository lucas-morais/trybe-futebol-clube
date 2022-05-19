import User from '../database/models/user';

export default class UserModel {
  public static async findByUnique(data: Partial<User>): Promise<User | null> {
    const { email } = data;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
