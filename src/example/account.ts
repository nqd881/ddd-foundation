import { Aggregate, AggregateBuilder } from '../common';
import { AccountCreatedEventBuilder } from './account-created.event';
import { AggregateTypes } from './constants';

export type AccountProps = {
  username: string;
  password: string;
};

export class Account extends Aggregate<AccountProps>(AggregateTypes.Account) {
  validateProps(props: AccountProps): void {}

  static create(props: AccountProps) {
    const accountBuilder = new AggregateBuilder(Account);

    const newAccount = accountBuilder.new(props);

    newAccount.recordEvent(
      AccountCreatedEventBuilder.new(newAccount.id, {
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
