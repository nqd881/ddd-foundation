import { AggregateBase, AggregateConstructor, AnyAggregate } from '#core/aggregate.base';
import { GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export abstract class Aggregate<P> extends AggregateBase<P> {
  static new<T extends AnyAggregate>(
    aggregateClass: AggregateClass<T>,
    props: GetEntityProps<T>,
    id: string = v4(),
  ) {
    return new aggregateClass(id, props, 0, false);
  }

  static load<T extends AnyAggregate>(
    aggregateClass: AggregateClass<T>,
    id: string,
    props: GetEntityProps<T>,
    version: number,
  ) {
    return new aggregateClass(id, props, version, true);
  }
}

export type AggregateClass<T extends AnyAggregate> = AggregateConstructor<T>;
