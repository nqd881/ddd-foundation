import { DomainEventClass } from '#common/types/domain-event.type';
import { AnyDomainEvent, GetDomainEventProps } from '#core/domain-event.base';
import { v4 } from 'uuid';

export class DomainEventBuilder {
  static new<T extends AnyDomainEvent>(
    domainEventClass: DomainEventClass<T>,
    aggregateId: string,
    props: GetDomainEventProps<T>,
  ) {
    return new domainEventClass(v4(), aggregateId, Date.now(), props);
  }
}
