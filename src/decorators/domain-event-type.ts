import { AnyDomainEvent } from '#core/domain-event';
import { DomainEventClass } from '#types/domain-event.type';
import { DOMAIN_EVENT_METADATA } from './constants';

export const DomainEventType = <T extends AnyDomainEvent>(aggregateType: string, type?: string) => {
  return <U extends DomainEventClass<T>>(target: U) => {
    const eventType = type ?? target.name;

    Reflect.defineMetadata(DOMAIN_EVENT_METADATA, { aggregateType, eventType }, target);
  };
};
