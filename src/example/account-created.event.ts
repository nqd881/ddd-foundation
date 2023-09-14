import { DomainEvent, DomainEventBuilder } from '../common';
import { AggregateTypes } from './constants';

export type AccountCreatedEventProps = {
  accountId: string;
  username: string;
};

export class AccountCreatedEvent extends DomainEvent<AccountCreatedEventProps>(
  AggregateTypes.Account,
  'account.created',
) {}

export const AccountCreatedEventBuilder = new DomainEventBuilder(AccountCreatedEvent);
