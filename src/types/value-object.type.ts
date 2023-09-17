import { AnyValueObject, ValueObjectConstructorParams } from '#core/value-object';
import { Class } from 'type-fest';

export type ValueObjectClass<T extends AnyValueObject> = Class<T, ValueObjectConstructorParams<T>>;
