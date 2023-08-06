import { Type } from '#types/type';

export interface DomainEventMetadata {
  name: string;
  id: string;
  timestamp: number;
}

export type DomainEventProps<E extends AnyDomainEvent> = Omit<E, 'metadata'>;

export class DomainEventBase<P> {
  public readonly metadata: Readonly<DomainEventMetadata>;
  public readonly props: Readonly<P>;

  constructor(metadata: DomainEventMetadata, props: P) {
    this.metadata = metadata;
    this.props = props;
  }
}

export type AnyDomainEvent = DomainEventBase<any>;

export type TypeDomainEvent<T extends AnyDomainEvent = AnyDomainEvent> = Type<T>;

export type GetDomainEventProps<T extends AnyDomainEvent = AnyDomainEvent> =
  T extends DomainEventBase<infer P> ? P : any;

export type DomainEventConstructor<T extends AnyDomainEvent = AnyDomainEvent> = new (
  ...args: ConstructorParameters<typeof DomainEventBase<GetDomainEventProps<T>>>
) => T;
