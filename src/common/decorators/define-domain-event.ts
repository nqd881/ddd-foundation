import { AnyDomainEvent } from '#core/domain-event.base';
import { DomainEventClass } from '../core-wrapper';
import { ImplementStatic } from './implement-static';

export function DefineDomainEvent<T extends AnyDomainEvent>() {
  return ImplementStatic<DomainEventClass<T>>();
}
