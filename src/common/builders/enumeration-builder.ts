import { EnumerationClass } from '#common/types/enumeration.type';
import { AnyEnumeration, GetEnumerationValue } from '#core/enumeration.base';

export class EnumerationBuilder {
  static parse<T extends AnyEnumeration>(
    enumerationClass: EnumerationClass<T>,
    value: GetEnumerationValue<T>,
  ) {
    return this.all(enumerationClass).find((instance) => instance.value === value);
  }

  static all<T extends AnyEnumeration>(enumerationClass: EnumerationClass<T>): T[] {
    const properties = Object.keys(enumerationClass);

    return properties
      .map((name) => (enumerationClass as any)[name])
      .filter((value) => value instanceof enumerationClass) as T[];
  }
}
