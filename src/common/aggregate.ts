import {
  AggregateBase,
  AggregateConstructor,
  AnyAggregate,
} from "#core/aggregate.base";
import { GetEntityProps } from "#core/entity.base";
import { v4 } from "uuid";

export abstract class Aggregate<P> extends AggregateBase<P> {
  static new<T extends AnyAggregate>(
    props: GetEntityProps<T>,
    id: string = v4()
  ) {
    return new (this.constructor as AggregateConstructor<T>)(
      id,
      props,
      0,
      false
    );
  }

  static load<T extends AnyAggregate>(
    id: string,
    props: GetEntityProps<T>,
    version: number
  ) {
    return new (this.constructor as AggregateConstructor<T>)(
      id,
      props,
      version,
      true
    );
  }
}
