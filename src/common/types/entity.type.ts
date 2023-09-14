import {
  AnyEntity,
  EntityBase,
  EntityBaseConstructorParamsWithProps,
  GetEntityProps,
} from '#core/entity.base';
import { AbstractClass, Class } from 'type-fest';
import { AbstractableClass } from './abstractable-class';

// constructor param types
export type EntityConstructorParamsWithProps<Props> = [
  ...(EntityBaseConstructorParamsWithProps<Props> extends [infer T, ...infer R] ? R : never),
];

export type EntityConstructorParams<T extends AnyEntity> = EntityConstructorParamsWithProps<
  GetEntityProps<T>
>;

// static
export type EntityStatic<C extends AbstractableClass<AnyEntity>> = C & {
  EntityType: string;
};

// class types
export type EntityClassWithProps<Props> = Class<
  EntityBase<Props>,
  EntityConstructorParamsWithProps<Props>
>;

export type EntityClass<T extends AnyEntity> = Class<T, EntityConstructorParams<T>>;

// abstract class types
export type AbstractEntityClassWithProps<Props> = AbstractClass<
  EntityBase<Props>,
  EntityConstructorParamsWithProps<Props>
>;

export type AbstractEntityClass<T extends AnyEntity> = AbstractClass<T, EntityConstructorParams<T>>;
