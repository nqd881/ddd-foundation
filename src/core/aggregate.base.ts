import { AnyDomainEvent } from './domain-event.base';
import { EntityBase, GetEntityProps } from './entity.base';

export abstract class AggregateBase<P> extends EntityBase<P> {
  protected _originalVersion: number;
  protected _events: AnyDomainEvent[];

  // loaded from repo or new instance
  protected _loaded: boolean;

  constructor(type: string, id: string, props: P, originalVersion: number, loaded: boolean) {
    super(type, id, props);

    if (originalVersion < 0) throw new Error('Version must be set with non-negative number');

    this._originalVersion = originalVersion;
    this._events = [];
    this._loaded = loaded;

    if (this.isNew()) {
      this.mark();
    }
  }

  static isAggregate(obj: object): obj is AnyAggregate {
    return obj instanceof AggregateBase;
  }

  hasUnpublishedEvents() {
    return Boolean(this.events.length);
  }

  protected recordEvent(event: AnyDomainEvent) {
    this._events.push(event);
  }

  clearEvents() {
    this._events = [];
  }

  // mean has no change was saved before
  isNew() {
    return this._originalVersion === 0 && !this._loaded;
  }

  get events() {
    return this._events;
  }

  get originalVersion() {
    return this._originalVersion;
  }

  get version() {
    if (this.hasChanged()) return this._originalVersion + 1;

    return this._originalVersion;
  }

  get loaded() {
    return this._loaded;
  }
}

export type AnyAggregate = AggregateBase<any>;

export type AggregateBaseConstructorParamsWithProps<P> = ConstructorParameters<
  typeof AggregateBase<P>
>;

export type AggregateBaseConstructorParams<T extends AnyAggregate> =
  AggregateBaseConstructorParamsWithProps<GetEntityProps<T>>;

// export type AggregateBaseClassWithProps<Props> = Class<
//   AggregateBase<Props>,
//   AggregateBaseConstructorParamsWithProps<Props>
// >;

// export type AggregateBaseClass<T extends AnyAggregate> = Class<
//   T,
//   AggregateBaseConstructorParams<T>
// >;
