import { AnyAggregate } from '#core/aggregate';
import { AggregateClass } from '#types/aggregate.type';
import { AGGREGATE_TYPE } from './constants';
import 'reflect-metadata';

export const AggregateType = <T extends AnyAggregate>(type?: string) => {
  return <U extends AggregateClass<T>>(target: U) => {
    const aggregateType = type || target.name;

    Reflect.defineMetadata(AGGREGATE_TYPE, aggregateType, target);
  };
};
