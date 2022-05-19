export default interface IModel <T> {
  // create(data: T): Promise<T>;
  // findAll(): Promise<T[]>;
  findByUnique(data: Partial<T>): Promise<T | null>;
  // remove(id: number): Promise<T>;
}
