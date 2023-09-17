import { EnumerationClass } from '#types/enumeration.type';
import 'reflect-metadata';
import { ENUMERATION_TYPE } from './constants';
import { AnyEnumeration } from '#core/enumeration';

export const EnumerationType = <T extends AnyEnumeration>(type?: string) => {
  return <U extends EnumerationClass<T>>(target: U) => {
    const enumerationType = type ?? target.name;

    Reflect.defineMetadata(ENUMERATION_TYPE, enumerationType, target);
  };
};
