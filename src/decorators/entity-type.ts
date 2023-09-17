import { AnyEntity } from '#core/entity';
import { EntityClass } from '#types/entity.type';
import { ENTITY_TYPE } from './constants';
import 'reflect-metadata';

export const EntityType = <T extends AnyEntity>(type?: string) => {
  return <U extends EntityClass<T>>(target: U) => {
    const entityType = type ?? target.name;

    Reflect.defineMetadata(ENTITY_TYPE, entityType, target);
  };
};
