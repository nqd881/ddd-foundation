import { Type } from '#types/type';
import _ from 'lodash';

export type EntityUpdateFn = () => void;

export type EntityUpdateResult<T extends AnyEntity = AnyEntity> = {
  beforeProps: GetEntityProps<T>;
  afterProps: GetEntityProps<T>;
};

export class EntityUpdater<T extends AnyEntity = AnyEntity> {
  entity: T;
  updateFn: EntityUpdateFn;
  result: EntityUpdateResult<T>;
  executed: boolean;

  constructor(entity: T, updateFn: EntityUpdateFn) {
    this.entity = entity;
    this.updateFn = updateFn;
    this.result = {
      beforeProps: null,
      afterProps: null,
    };
    this.executed = false;
  }

  update() {
    if (this.executed) return;

    this.result.beforeProps = this.entity.getProps();

    this.updateFn();

    this.result.afterProps = this.entity.getProps();

    this.executed = true;

    return this.result;
  }
}

export abstract class EntityBase<P> {
  protected readonly _id: string;
  protected _props: P;
  protected _marked: boolean;
  protected _updaters: EntityUpdater[];

  constructor(id: string, props: P) {
    if (!id) throw new Error('Id must be provided');

    this._id = id;
    this._marked = false;
    this._updaters = [];
    this.setProps(props);
  }

  static isEntity(obj: any): obj is AnyEntity {
    return obj instanceof EntityBase;
  }

  abstract validateProps(props: P): void;

  get id() {
    return this._id;
  }

  get updaters() {
    return this._updaters;
  }

  private setProps(props: P) {
    this.validateProps(props);

    this._props = props;
  }

  hasId(id: string) {
    return this.id === id;
  }

  protected mark() {
    this._marked = true;
  }

  protected unmark() {
    this._marked = false;
  }

  protected update(updateFn: EntityUpdateFn) {
    const updater = new EntityUpdater(this, updateFn);

    const result = updater.update();

    this.validateProps(this._props);

    this._updaters.push(updater);

    this.mark();

    return result;
  }

  hasChanged() {
    return this._marked;
  }

  equalsType(entity: AnyEntity) {
    return entity instanceof this.constructor;
  }

  equals(entity: AnyEntity) {
    if (!this.equalsType(entity)) return false;

    return this.hasId(entity.id);
  }

  getProps() {
    return _.cloneDeep(this._props);
  }
}

export type AnyEntity = EntityBase<any>;

export type TypeEntity<T extends AnyEntity = AnyEntity> = Type<T>;

export type GetEntityProps<T extends AnyEntity> = T extends EntityBase<infer P> ? P : any;

export type EntityConstructor<T extends AnyEntity = AnyEntity> = new (
  ...args: ConstructorParameters<typeof EntityBase<GetEntityProps<T>>>
) => T;
