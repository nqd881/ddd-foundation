import { EntityClass } from '#common/types/entity.type';
import { AnyEntity, GetEntityProps } from '#core/entity.base';
import { v4 } from 'uuid';

export class EntityBuilder {
  new<T extends AnyEntity>(
    entityClass: EntityClass<T>,
    props: GetEntityProps<T>,
    id: string = v4(),
  ) {
    return new entityClass(id, props);
  }
}
