import {
  AnyDomainEvent,
  DomainEventBase,
  DomainEventBaseConstructorParamsWithProps,
  GetDomainEventProps,
} from '#core/domain-event.base';
import { Class } from 'type-fest';
import { AbstractableClass } from './abstractable-class';

// constructor params types
export type DomainEventConstructorParamsWithProps<Props> = [
  ...(DomainEventBaseConstructorParamsWithProps<Props> extends [infer Metadata, ...infer Result]
    ? Result
    : never),
];

export type DomainEventConstructorParams<T extends AnyDomainEvent> =
  DomainEventConstructorParamsWithProps<GetDomainEventProps<T>>;

// static
export type DomainEventStatic<C extends AbstractableClass<AnyDomainEvent>> = C & {
  AggregateType: string;
  EventType: string;
};

// class types
export type DomainEventClassWithProps<Props> = DomainEventStatic<
  Class<DomainEventBase<Props>, DomainEventConstructorParamsWithProps<Props>>
>;

export type DomainEventClass<T extends AnyDomainEvent> = DomainEventStatic<
  Class<T, DomainEventConstructorParams<T>>
>;
