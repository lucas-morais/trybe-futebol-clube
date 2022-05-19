import { readFile } from 'fs/promises';

export default class ReadFile {
  public static async read(file: string):Promise<string> {
    try {
      const buffer = await readFile(file, 'utf-8');
      return buffer;
    } catch (err) {
      throw new Error('file not found');
    }
  }
}
