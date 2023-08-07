import { AnyAggregate } from '#core/aggregate.base';
import { AggregateClass } from '../core-wrappers';
import { ImplementStatic } from './implement-static';

export function DefineAggregate<T extends AnyAggregate>() {
  return ImplementStatic<AggregateClass<T>>();
}
