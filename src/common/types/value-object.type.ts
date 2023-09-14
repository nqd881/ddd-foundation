import { AnyValueObject, GetValueObjectProps, ValueObjectBase } from '#core/value-object.base';
import { AbstractClass, Class } from 'type-fest';
import { AbstractableClass } from './abstractable-class';

// constructor params types
export type ValueObjectConstructorParamsWithProps<Props> = [props: Props];

export type ValueObjectConstructorParams<T extends AnyValueObject> =
  ValueObjectConstructorParamsWithProps<GetValueObjectProps<T>>;

// static
export type ValueObjectStatic<C extends AbstractableClass<AnyValueObject>> = C & {
  ValueObjectType: string;
};

// class types
export type ValueObjectClassWithProps<Props> = Class<
  ValueObjectBase<Props>,
  ValueObjectConstructorParamsWithProps<Props>
>;

export type ValueObjectClass<T extends AnyValueObject> = Class<T, ValueObjectConstructorParams<T>>;

// abstract class types
export type AbstractValueObjectClassWithProps<Props> = AbstractClass<
  ValueObjectBase<Props>,
  ValueObjectConstructorParamsWithProps<Props>
>;

export type AbstractValueObjectClass<T extends AnyValueObject> = AbstractClass<
  T,
  ValueObjectConstructorParams<T>
>;
