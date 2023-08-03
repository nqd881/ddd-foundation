import { AnyDomainEvent } from "#core/domain-event.base";
import { IDomainEventSubscriber } from "./domain-event-subscriber.interface";

export interface IDomainEventPublisher {
  removeSubscriber(subscriber: IDomainEventSubscriber): void;

  subscribe(subscriber: IDomainEventSubscriber): void;

  publish(event: AnyDomainEvent): void;
}
