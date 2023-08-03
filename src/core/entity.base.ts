import { Type } from "#types/type";
import _ from "lodash";

export type EntityUpdater = () => void;

export abstract class EntityBase<P> {
  protected readonly _id: string;
  protected _props: P;
  protected _marked: boolean = false;

  constructor(id: string, props: P) {
    if (!id) throw new Error("Id must be provided");

    this._id = id;

    this.setProps(props);
  }

  static isEntity(obj: any): obj is AnyEntity {
    return obj instanceof EntityBase;
  }

  abstract validateProps(props: P): void;

  get id() {
    return this._id;
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

  protected update(updater: EntityUpdater) {
    updater();

    this.validateProps(this._props);

    this.mark();
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

export type GetEntityProps<T extends AnyEntity> = T extends EntityBase<infer P>
  ? P
  : any;

export type EntityConstructor<T extends AnyEntity = AnyEntity> = new (
  ...args: ConstructorParameters<typeof EntityBase<GetEntityProps<T>>>
) => T;
