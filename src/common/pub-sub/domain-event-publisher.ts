import { AnyAggregate } from '#core/aggregate.base';
import { AnyDomainEvent } from '#core/domain-event.base';
import { AnyDomainEventSubscriber, DomainEventSubscriber } from './domain-event-subscriber';
import { IDomainEventPublisher } from './interfaces/domain-event-publisher.interface';

export class DomainEventPublisher implements IDomainEventPublisher {
  private static _subscribers: AnyDomainEventSubscriber[];

  private constructor() {}

  static instance() {
    return new DomainEventPublisher();
  }

  removeSubscriber<E extends AnyDomainEvent>(subscriber: DomainEventSubscriber<E>) {
    DomainEventPublisher._subscribers = DomainEventPublisher._subscribers.filter(
      (_subscriber) => _subscriber === subscriber,
    );
  }

  subscribe<E extends AnyDomainEvent>(subscriber: DomainEventSubscriber<E>) {
    if (!DomainEventPublisher._subscribers) DomainEventPublisher._subscribers = [];

    DomainEventPublisher._subscribers.push(subscriber);
  }

  publish<E extends AnyDomainEvent>(event: E) {
    DomainEventPublisher._subscribers.forEach((subscriber) => {
      subscriber.handleEvent(event);
    });
  }

  publishAll<T extends AnyAggregate = AnyAggregate>(aggregate: T) {
    const events = aggregate.publishEvents();

    events.forEach((event) => this.publish(event));
  }
}
