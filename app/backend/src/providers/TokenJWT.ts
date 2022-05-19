import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IToken, IUserResponse } from '../interfaces';
import ReadFile from './ReadFile';

export default class TokenJWT implements IToken {
  private static FILE = './jwt.evaluation.key';

  private tokenSecret: string;

  private static OPTIONS:SignOptions = {
    algorithm: 'HS256',
    expiresIn: '14d',
  };

  public async init() {
    this.tokenSecret = await ReadFile.read(TokenJWT.FILE);
  }

  public createToken(user: IUserResponse): string {
    const secret = this.tokenSecret;
    const token = sign(user, secret, TokenJWT.OPTIONS);
    return token;
  }

  public decode(token: string): IUserResponse {
    const secret = this.tokenSecret;
    const payload = verify(token, secret);
    return payload as IUserResponse;
  }
}
