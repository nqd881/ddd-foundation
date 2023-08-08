export type EnumerationValue = string | number;

export class Enumeration {
  protected constructor(private readonly _value: EnumerationValue) {}

  get value() {
    return this._value;
  }

  static parse<T extends Enumeration>(value: EnumerationValue): T | undefined {
    return Enumeration.getAll().find((instance) => instance.value === value) as T;
  }

  static getAll<T extends Enumeration>(): T[] {
    const enumClass = this as unknown as typeof Enumeration;

    const properties = Object.getOwnPropertyNames(enumClass.prototype);

    return properties
      .map((name) => (enumClass as any)[name])
      .filter((value) => value instanceof enumClass);
  }

  static getAllValues() {
    const allInstances = this.getAll();

    return allInstances.map((instance) => instance.value);
  }
}
