import { sign, SignOptions } from 'jsonwebtoken';
import { IUserResponse } from '../interfaces/IUser';
import { IToken } from '../interfaces';
import ReadFile from './ReadFile';

export default class TokenJWT implements IToken {
  private static FILE = './jwt.evaluation.key';

  private tokenSecret: Promise<string>;

  private static OPTIONS:SignOptions = {
    algorithm: 'HS256',
    expiresIn: '14d',
  };

  constructor() {
    this.tokenSecret = ReadFile.read(TokenJWT.FILE);
  }

  public async createToken(user: IUserResponse): Promise<string> {
    const secret = await this.tokenSecret;
    const token = sign(user, secret, TokenJWT.OPTIONS);
    return token;
  }

  // public async validateToken(token: string): boolean {
  //   throw new Error('Method not implemented.');
  // }
}
