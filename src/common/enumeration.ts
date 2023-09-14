import { EnumerationBase, EnumerationValue } from '#core/enumeration.base';
import { EnumerationClassWithValue } from './types/enumeration.type';

export const Enumeration = <Value extends EnumerationValue>(
  type: string,
): EnumerationClassWithValue<Value> => {
  return class extends EnumerationBase<Value> {
    static readonly EnumerationType = type;

    constructor(value: Value) {
      super(type, value);
    }
  };
};
