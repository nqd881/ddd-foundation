import { EntityClass } from '#common/types/entity.type';
import { AnyEntity, GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export class EntityBuilder<T extends AnyEntity> {
  constructor(private entityClass: EntityClass<T>) {}

  new(props: GetEntityProps<T>, id: string = v4()) {
    return new this.entityClass(id, props);
  }
}
