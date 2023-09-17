import { DomainEventClass } from '#types/domain-event.type';
import { DOMAIN_EVENT_METADATA } from 'src/decorators';
import { v4 } from 'uuid';
import 'reflect-metadata';

export interface DomainEventMetadata {
  eventType: string;
  aggregateType: string;
}

export class DomainEvent<P> {
  public readonly metadata: Readonly<DomainEventMetadata>;
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly timestamp: number;
  public readonly props: Readonly<P>;

  constructor(
    metadata: DomainEventMetadata,
    id: string,
    aggregateId: string,
    timestamp: number,
    props: P,
  ) {
    this.metadata = metadata;
    this.id = id;
    this.aggregateId = aggregateId;
    this.timestamp = timestamp;
    this.props = props;
  }

  static newEvent<T extends AnyDomainEvent>(
    this: DomainEventClass<T>,
    aggregateId: string,
    props: GetDomainEventProps<T>,
    id: string = v4(),
  ) {
    const metadata = Reflect.getMetadata(DOMAIN_EVENT_METADATA, this);

    return new this(metadata, id, aggregateId, Date.now(), props);
  }
}

export type AnyDomainEvent = DomainEvent<any>;

export type GetDomainEventProps<T extends AnyDomainEvent> = T extends DomainEvent<infer P>
  ? P
  : never;

export type DomainEventConstructorParamsWithProps<Props> = ConstructorParameters<
  typeof DomainEvent<Props>
>;

export type DomainEventConstructorParams<T extends AnyDomainEvent> =
  DomainEventConstructorParamsWithProps<GetDomainEventProps<T>>;
