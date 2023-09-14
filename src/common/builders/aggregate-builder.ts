import { AggregateClass } from '#common/types/aggregate.type';
import { AnyAggregate } from '#core/aggregate.base';
import { GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export class AggregateBuilder {
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
