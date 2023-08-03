import { AnyDomainEvent } from "#core/domain-event.base";

export interface IDomainEventSubscriber {
  subscribedEventName: string;
  handleEvent(event: AnyDomainEvent): void;
}
