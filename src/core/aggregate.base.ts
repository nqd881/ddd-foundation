import { Type } from '#types/type';
import { AnyDomainEvent } from './domain-event.base';
import { EntityBase, GetEntityProps } from './entity.base';

export abstract class AggregateBase<P> extends EntityBase<P> {
  protected _originalVersion: number;
  protected _events: AnyDomainEvent[];

  // loaded from repo or new instance
  protected _loaded: boolean;

  constructor(id: string, props: P, originalVersion: number, loaded: boolean) {
    super(id, props);

    if (originalVersion < 0) throw new Error('Version must be set with non-negative number');

    this._originalVersion = originalVersion;
    this._events = [];
    this._loaded = loaded;

    if (this.isNew()) {
      this.mark();
    }
  }

  static isAggregate(obj: any): obj is AnyAggregate {
    return obj instanceof AggregateBase;
  }

  hasUnpublishedEvents() {
    return Boolean(this.unpublishedEvents.length);
  }

  publishEvents() {
    const events = this.unpublishedEvents.slice();

    this.clearEvents();

    return events;
  }

  protected recordEvent(event: AnyDomainEvent) {
    if (!this.isNew()) this._events.push(event);
  }

  clearEvents() {
    this._events = [];
  }

  // mean has no change was saved before
  isNew() {
    return this._originalVersion === 0 && !this._loaded;
  }

  get unpublishedEvents() {
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

export type TypeAggregate<T extends AnyAggregate = AnyAggregate> = Type<T>;

export type AggregateConstructor<T extends AnyAggregate = AnyAggregate> = new (
  ...args: ConstructorParameters<typeof AggregateBase<GetEntityProps<T>>>
) => T;
