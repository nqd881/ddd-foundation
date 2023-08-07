import { AnyEntity } from '#core/entity.base';
import { EntityClass } from '../core-wrappers';
import { ImplementStatic } from './implement-static';

export function DefineEntity<T extends AnyEntity>() {
  return ImplementStatic<EntityClass<T>>();
}
