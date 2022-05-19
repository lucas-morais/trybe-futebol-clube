import { IUserResponse } from './IUser';

export default interface Token {
  createToken(user: IUserResponse): Promise<string>;
  // validateToken(token: string): boolean;
}
