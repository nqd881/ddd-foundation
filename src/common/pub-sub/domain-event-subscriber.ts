import { AnyDomainEvent } from '#core/domain-event.base';
import { MaybePromise } from '#types/maybe-promise';
import { Type } from '#types/type';
import { IDomainEventSubscriber } from './interfaces/domain-event-subscriber.interface';

export type DomainEventHandler<E extends AnyDomainEvent> = (event: E) => MaybePromise<void>;

export abstract class DomainEventSubscriber<E extends AnyDomainEvent = AnyDomainEvent>
  implements IDomainEventSubscriber
{
  public readonly subscribedEventName: string;

  constructor(subscribedEventName: string) {
    this.subscribedEventName = subscribedEventName;
  }

  abstract handle(event: E): MaybePromise<void>;

  handleEvent(event: E) {
    if (event.metadata.name !== this.subscribedEventName) return;

    this.handle(event);
  }
}

export type AnyDomainEventSubscriber = DomainEventSubscriber;

export type TypeDomainEventSubscriber<T extends AnyDomainEvent = AnyDomainEvent> = Type<
  DomainEventSubscriber<T>
>;
