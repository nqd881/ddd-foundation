import {
  AggregateBase,
  AggregateBaseConstructorParamsWithProps,
  AnyAggregate,
} from '#core/aggregate.base';
import { GetEntityProps } from '#core/entity.base';
import { AbstractClass, Class } from 'type-fest';
import { AbstractableClass } from './abstractable-class';

// constructor params types
export type AggregateConstructorParamsWithProps<Props> = [
  ...(AggregateBaseConstructorParamsWithProps<Props> extends [infer T, ...infer R] ? R : never),
];

export type AggregateConstructorParams<T extends AnyAggregate> =
  AggregateConstructorParamsWithProps<GetEntityProps<T>>;

// static
export type AggregateStatic<C extends AbstractableClass<AnyAggregate>> = C & {
  AggregateType: string;
};

// class types
export type AggregateClassWithProps<Props> = AggregateStatic<
  Class<AggregateBase<Props>, AggregateConstructorParamsWithProps<Props>>
>;

export type AggregateClass<T extends AnyAggregate> = AggregateStatic<
  Class<T, AggregateConstructorParams<T>>
>;

// abstract class types
export type AbstractAggregateClassWithProps<Props> = AggregateStatic<
  AbstractClass<AggregateBase<Props>, AggregateConstructorParamsWithProps<Props>>
>;

export type AbstractAggregateClass<T extends AnyAggregate> = AggregateStatic<
  AbstractClass<T, AggregateConstructorParams<T>>
>;
