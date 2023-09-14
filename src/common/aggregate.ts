import { AggregateBase } from '#core/aggregate.base';
import {
  AbstractAggregateClassWithProps,
  AggregateConstructorParamsWithProps,
} from './types/aggregate.type';

export const Aggregate = <Props>(aggregateType: string): AbstractAggregateClassWithProps<Props> => {
  abstract class A extends AggregateBase<Props> {
    static readonly AggregateType = aggregateType;

    constructor(...args: AggregateConstructorParamsWithProps<Props>) {
      super(aggregateType, ...args);
    }

    get props() {
      return this._props;
    }
  }

  return A;
};
