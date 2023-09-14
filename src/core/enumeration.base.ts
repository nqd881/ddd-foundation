export type EnumerationValue = string | number;

export class EnumerationBase<Value extends EnumerationValue> {
  private readonly _type: string;
  private readonly _value: Value;

  constructor(type: string, value: Value) {
    this._type = type;
    this._value = value;
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }
}

export type AnyEnumeration = EnumerationBase<EnumerationValue>;

export type GetEnumerationValue<T extends AnyEnumeration> = T extends EnumerationBase<infer V>
  ? V
  : never;

export type EnumerationBaseConstructorParamsWithValue<Value extends EnumerationValue> =
  ConstructorParameters<typeof EnumerationBase<Value>>;

export type EnumerationBaseConstructorParams<T extends AnyEnumeration> =
  EnumerationBaseConstructorParamsWithValue<GetEnumerationValue<T>>;
