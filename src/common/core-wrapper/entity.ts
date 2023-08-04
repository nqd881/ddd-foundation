import { AnyEntity, EntityBase, EntityConstructor, GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export abstract class Entity<P> extends EntityBase<P> {
  static new<T extends AnyEntity>(
    entityClass: EntityClass<T>,
    props: GetEntityProps<T>,
    id: string = v4(),
  ) {
    return new entityClass(id, props);
  }
}

export type EntityClass<T extends AnyEntity> = EntityConstructor<T>;
