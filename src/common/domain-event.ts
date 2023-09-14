import { DomainEventBase } from '#core/domain-event.base';
import {
  DomainEventClassWithProps,
  DomainEventConstructorParamsWithProps,
} from './types/domain-event.type';

export const DomainEvent = <Props>(
  aggregateType: string,
  eventType: string,
): DomainEventClassWithProps<Props> => {
  return class extends DomainEventBase<Props> {
    static readonly AggregateType = aggregateType;
    static readonly EventType = eventType;

    constructor(...args: DomainEventConstructorParamsWithProps<Props>) {
      super(
        {
          aggregateType,
          eventType,
        },
        ...args,
      );
    }
  };
};
