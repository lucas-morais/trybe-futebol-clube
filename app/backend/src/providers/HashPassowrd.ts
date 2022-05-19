import { compare, hash } from 'bcrypt';

export default class HashPassowrd {
  public static createHash(password: string): Promise<string> {
    return hash(password, 10);
  }

  public static checkPassword(password:string, hashPassowrd:string): Promise<boolean> {
    return compare(password, hashPassowrd);
  }
}
