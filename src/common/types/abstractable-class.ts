import { AbstractClass, Class } from 'type-fest';

export type AbstractableClass<T, Args extends unknown[] = any[]> =
  | Class<T, Args>
  | AbstractClass<T, Args>;
