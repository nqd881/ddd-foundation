export interface DomainEventMetadata {
  eventType: string;
  aggregateType: string;
}

export class DomainEventBase<P> {
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
}

export type AnyDomainEvent = DomainEventBase<any>;

export type GetDomainEventProps<T extends AnyDomainEvent> = T extends DomainEventBase<infer P>
  ? P
  : never;

export type DomainEventBaseConstructorParamsWithProps<Props> = ConstructorParameters<
  typeof DomainEventBase<Props>
>;

export type DomainEventBaseConstructorParams<T extends AnyDomainEvent> =
  DomainEventBaseConstructorParamsWithProps<GetDomainEventProps<T>>;
