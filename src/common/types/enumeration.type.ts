import {
  AnyEnumeration,
  EnumerationBase,
  EnumerationBaseConstructorParamsWithValue,
  EnumerationValue,
  GetEnumerationValue,
} from '#core/enumeration.base';
import { Class } from 'type-fest';
import { AbstractableClass } from './abstractable-class';

// constructor param types
export type EnumerationConstructorParamsWithValue<Value extends EnumerationValue> = [
  ...(EnumerationBaseConstructorParamsWithValue<Value> extends [infer Type, ...infer Result]
    ? Result
    : never),
];

export type EnumerationConstructorParams<T extends AnyEnumeration> =
  EnumerationConstructorParamsWithValue<GetEnumerationValue<T>>;

// static
export type EnumerationStatic<C extends AbstractableClass<AnyEnumeration>> = C & {
  EnumerationType: string;
};

// class type
export type EnumerationClassWithValue<Value extends EnumerationValue> = EnumerationStatic<
  Class<EnumerationBase<Value>, EnumerationConstructorParamsWithValue<Value>>
>;

export type EnumerationClass<T extends AnyEnumeration> = EnumerationStatic<
  Class<T, EnumerationConstructorParams<T>>
>;
