import { ILogin, ILoginResponse, IToken } from '../interfaces';
import UserService from './UserService';

export default class LoginService {
  constructor(private tokenJwt: IToken) {

  }

  public async login(data: ILogin): Promise<ILoginResponse> {
    const { email } = data;
    const user = await UserService.findByUnique({ email });
    if (!LoginService.checkLogin(data, user.email, user.password)) {
      throw new Error('Incorrect password or email');
    }

    const userResponse = UserService.serializer(user);
    const token = await this.tokenJwt.createToken(userResponse);
    return {
      user: userResponse,
      token,
    };
  }

  private static checkLogin(data:ILogin, email: string, password: string):boolean {
    return (data.password === password) && (data.email === email);
  }
}
