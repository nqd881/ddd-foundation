import { ValueObjectBase } from '#core/value-object.base';
import { AbstractValueObjectClassWithProps } from './types';

export const ValueObject = <Props>(type: string): AbstractValueObjectClassWithProps<Props> => {
  abstract class VO extends ValueObjectBase<Props> {
    static ValueObjectType = type;

    constructor(props: Props) {
      super(type, props);
    }
  }

  return VO;
};
