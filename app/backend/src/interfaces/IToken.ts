import { IUserResponse } from './IUser';

export default interface Token {
  createToken(user: IUserResponse): string;
  decode(token: string): IUserResponse;
}
