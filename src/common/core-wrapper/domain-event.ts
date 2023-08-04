import {
  AnyDomainEvent,
  DomainEventBase,
  DomainEventConstructor,
  GetDomainEventProps,
} from '#core/domain-event.base';
import { v4 } from 'uuid';

export class DomainEvent<P> extends DomainEventBase<P> {
  static new<T extends AnyDomainEvent>(
    eventClass: DomainEventClass<T>,
    props: GetDomainEventProps<T>,
  ) {
    return new eventClass(
      {
        name: eventClass.EVENT_NAME,
        id: v4(),
        timestamp: Date.now(),
      },
      props,
    );
  }
}

export type DomainEventClass<T extends AnyDomainEvent> = DomainEventConstructor<T> & {
  EVENT_NAME: string;
};
