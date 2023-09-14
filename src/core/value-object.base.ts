import _ from 'lodash';
import { Constructor } from 'type-fest';

export abstract class ValueObjectBase<P> {
  private readonly _type: string;
  protected readonly _props: Readonly<P>;

  constructor(type: string, props: P) {
    this.validateProps(props);

    this._type = type;
    this._props = props;
  }

  static isValueObject(obj: any) {
    return obj instanceof ValueObjectBase;
  }

  abstract validateProps(props: P): void;

  equalsType(obj: ValueObjectBase<P>) {
    // return obj instanceof this.constructor;
    return this.type === obj.type;
  }

  equals(obj: ValueObjectBase<P>) {
    if (obj === null || obj === undefined) return false;

    if (!this.equalsType(obj)) return false;

    return JSON.stringify(this.props) === JSON.stringify(obj.props);
  }

  cloneWith(props: Partial<P>) {
    const clonedProps = _.cloneDeep(this.props);

    return new (this.constructor as Constructor<ValueObjectBase<P>>)(
      _.merge(clonedProps, props),
    ) as this;
  }

  clone() {
    return this.cloneWith({});
  }

  get type() {
    return this._type;
  }

  get props() {
    return this._props;
  }
}

export type AnyValueObject = ValueObjectBase<any>;

export type GetValueObjectProps<T extends AnyValueObject> = T extends ValueObjectBase<infer Props>
  ? Props
  : any;

export type ValueObjectBaseConstructorParamsWithProps<Props> = ConstructorParameters<
  typeof ValueObjectBase<Props>
>;

export type ValueObjectBaseConstructorParams<T extends AnyValueObject> =
  ValueObjectBaseConstructorParamsWithProps<GetValueObjectProps<T>>;
