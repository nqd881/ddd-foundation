import { AnyConstructor } from '#types/constructor';

export function ImplementStatic<T extends AnyConstructor>() {
  return <U extends T>(constructor: U) => constructor;
}
