import { AnyDomainEvent } from '#core/domain-event.base';

export interface IDomainEventSubscriber<T extends AnyDomainEvent = AnyDomainEvent> {
  subscribedEventName: string;
  handleEvent(event: T): void;
}
