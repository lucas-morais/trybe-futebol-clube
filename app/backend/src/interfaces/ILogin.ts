import { IUserResponse } from './IUser';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUserResponse;
  token: string;
}
