import {
  AnyEntity,
  EntityBase,
  EntityConstructor,
  GetEntityProps,
} from "#core/entity.base";
import { v4 } from "uuid";

export abstract class Entity<P> extends EntityBase<P> {
  static new<T extends AnyEntity>(props: GetEntityProps<T>, id: string = v4()) {
    return new (this.constructor as EntityConstructor<T>)(id, props);
  }
}
