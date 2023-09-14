import { EnumerationBuilder } from '../common';
import { Account } from './account';
import { AccountStatus } from './account-status';
import { Password } from './password';

const account = Account.create({
  username: 'quocdaitinls',
  password: new Password({
    value: '123123',
    hashed: false,
  }),
});

console.log(Account.AggregateType);

console.log(account);

console.log(EnumerationBuilder.all(AccountStatus));

const status = EnumerationBuilder.parse(AccountStatus, 'ActivatePending');

console.log(status);
