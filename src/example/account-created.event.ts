import { DomainEvent } from '../common';
import { Aggregates } from './constants';

export type AccountCreatedEventProps = {
  accountId: string;
  username: string;
};

export class AccountCreatedEvent extends DomainEvent<AccountCreatedEventProps>(
  Aggregates.Account,
  'account.created',
) {}
