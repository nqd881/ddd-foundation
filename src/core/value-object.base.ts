import { Constructor } from "#types/constructor";
import { Type } from "#types/type";
import _ from "lodash";

export abstract class ValueObjectBase<P> {
  protected readonly props: Readonly<P>;

  constructor(props: P) {
    this.validateProps(props);

    this.props = props;
  }

  static isValueObject(obj: any) {
    return obj instanceof ValueObjectBase;
  }

  abstract validateProps(props: P): void;

  equalsType(obj: ValueObjectBase<P>) {
    return obj instanceof this.constructor;
  }

  equals(obj: ValueObjectBase<P>) {
    if (obj === null || obj === undefined) return false;

    if (!this.equalsType(obj)) return false;

    return JSON.stringify(this.props) === JSON.stringify(obj.props);
  }

  cloneWith(props: Partial<P>) {
    const clonedProps = _.cloneDeep(this.props);

    return new (this.constructor as Constructor<ValueObjectBase<P>>)(
      _.merge(clonedProps, props)
    ) as this;
  }

  clone() {
    return this.cloneWith({});
  }
}

export type AnyValueObject = ValueObjectBase<any>;

export type TypeValueObject<T extends AnyValueObject = AnyValueObject> =
  Type<T>;

export type GetValueObjectProps<T extends AnyValueObject> =
  T extends ValueObjectBase<infer P> ? P : any;

export type ValueObjectConstructor<T extends AnyValueObject = AnyValueObject> =
  new (
    ...args: ConstructorParameters<
      typeof ValueObjectBase<GetValueObjectProps<T>>
    >
  ) => T;
