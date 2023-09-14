import { Aggregate, AggregateBuilder, DomainEventBuilder } from '../common';
import { AccountCreatedEvent } from './account-created.event';
import { AggregateTypes } from './constants';

export type AccountProps = {
  username: string;
  password: string;
};

export class Account extends Aggregate<AccountProps>(AggregateTypes.Account) {
  validateProps(props: AccountProps): void {}

  static create(props: AccountProps) {
    const newAccount = AggregateBuilder.new(Account, props);

    newAccount.recordEvent(
      DomainEventBuilder.new(AccountCreatedEvent, newAccount.id, {
        accountId: newAccount.id,
        username: newAccount.username,
      }),
    );

    return newAccount;
  }

  get username() {
    return this._props.username;
  }
}
