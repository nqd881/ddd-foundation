import { EnumerationClass } from '#common/types/enumeration.type';
import { AnyEnumeration, GetEnumerationValue } from '#core/enumeration.base';

export class EnumerationBuilder<T extends AnyEnumeration> {
  constructor(private enumerationClass: EnumerationClass<T>) {}

  parse(value: GetEnumerationValue<T>) {
    return this.all().find((instance) => instance.value === value);
  }

  all(): T[] {
    const properties = Object.keys(this.enumerationClass);

    return properties
      .map((name) => (this.enumerationClass as any)[name])
      .filter((value) => value instanceof this.enumerationClass) as T[];
  }
}
