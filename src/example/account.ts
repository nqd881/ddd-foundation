import { Aggregate, AggregateBuilder, DomainEventBuilder } from '../common';
import { AccountCreatedEvent } from './account-created.event';
import { AccountStatus } from './account-status';
import { AggregateTypes } from './constants';
import { Password } from './password';

export type AccountProps = {
  username: string;
  password: Password;
  status: AccountStatus;
};

export type CreateAccountProps = Omit<AccountProps, 'status'>;

export class Account extends Aggregate<AccountProps>(AggregateTypes.Account) {
  validateProps(props: AccountProps): void {}

  static create(props: CreateAccountProps) {
    const newAccount = AggregateBuilder.new(Account, {
      ...props,
      status: AccountStatus.ActivatePending,
    });

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

  get password() {
    return this._props.password;
  }

  get status() {
    return this._props.status;
  }
}
