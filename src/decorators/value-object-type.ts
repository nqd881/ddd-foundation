import { AnyValueObject } from '#core/value-object';
import { ValueObjectClass } from '#types/value-object.type';
import { VALUE_OBJECT_TYPE } from './constants';
import 'reflect-metadata';

export const ValueObjectType = <T extends AnyValueObject>(type?: string) => {
  return <U extends ValueObjectClass<T>>(target: U) => {
    const valueObjectType = type ?? target.name;

    Reflect.defineMetadata(VALUE_OBJECT_TYPE, valueObjectType, target);
  };
};
