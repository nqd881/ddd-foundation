import { AggregateClass } from '#common/types/aggregate.type';
import { AnyAggregate } from '#core/aggregate.base';
import { GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export class AggregateBuilder<T extends AnyAggregate> {
  constructor(private aggregateClass: AggregateClass<T>) {}

  new(props: GetEntityProps<T>, id: string = v4()) {
    return new this.aggregateClass(id, props, 0, false);
  }

  load(id: string, props: GetEntityProps<T>, version: number) {
    return new this.aggregateClass(id, props, version, true);
  }
}
