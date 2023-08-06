import { MaybePromise } from '#types/maybe-promise';
import { AnyAggregate } from './aggregate.base';

export interface IRepoBase<AR extends AnyAggregate> {
  findById(id: string): MaybePromise<AR>;

  create(aggregates: AR | AR[]): MaybePromise<any>;

  updateOne(aggregate: AR): MaybePromise<any>;

  save(aggregate: AR): MaybePromise<any>;
}
