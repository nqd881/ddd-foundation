import {
  AnyDomainEvent,
  DomainEventBase,
  DomainEventConstructor,
  GetDomainEventProps,
} from "#core/domain-event.base";
import { v4 } from "uuid";

export class DomainEvent<P> extends DomainEventBase<P> {
  static new<T extends AnyDomainEvent>(
    eventName: string,
    props: GetDomainEventProps<T>
  ) {
    return new (this.constructor as DomainEventConstructor<T>)(
      {
        name: eventName,
        id: v4(),
        timestamp: Date.now(),
      },
      props
    );
  }
}
