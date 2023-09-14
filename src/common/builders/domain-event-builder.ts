import { DomainEventClass } from '#common/types/domain-event.type';
import { AnyDomainEvent, GetDomainEventProps } from '#core/domain-event.base';
import { v4 } from 'uuid';

export class DomainEventBuilder<T extends AnyDomainEvent> {
  constructor(private eventClass: DomainEventClass<T>) {}

  new(aggregateId: string, props: GetDomainEventProps<T>) {
    return new this.eventClass(v4(), aggregateId, Date.now(), props);
  }
}
