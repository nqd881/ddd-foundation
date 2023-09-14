import { EntityBase } from '#core/entity.base';
import {
  AbstractEntityClassWithProps,
  EntityConstructorParamsWithProps,
} from './types/entity.type';

export const Entity = <Props>(entityType: string): AbstractEntityClassWithProps<Props> => {
  abstract class E extends EntityBase<Props> {
    static readonly EntityType = entityType;

    constructor(...args: EntityConstructorParamsWithProps<Props>) {
      super(entityType, ...args);
    }
  }

  return E;
};
