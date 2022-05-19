import HashPassowrd from '../providers/HashPassowrd';
import { UnauthorizedError } from '../errors';
import { ILogin, ILoginResponse, IToken } from '../interfaces';
import UserService from './UserService';

export default class LoginService {
  constructor(private tokenJwt: IToken) {

  }

  public async login(data: ILogin): Promise<ILoginResponse> {
    const { email, password } = data;
    const user = await UserService.findByUnique({ email });
    if (!user || !await LoginService.checkLogin(password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const userResponse = UserService.serializer(user);
    const token = this.tokenJwt.createToken(userResponse);
    return {
      user: userResponse,
      token,
    };
  }

  private static async checkLogin(password: string, hashPassword: string): Promise<boolean> {
    const passwordIsCorrect = await HashPassowrd.checkPassword(password, hashPassword);
    return passwordIsCorrect;
  }
}
