import { EnumerationBuilder } from '../common';
import { Account } from './account';
import { AccountStatus } from './account-status';

const account = Account.create({
  username: 'quocdaitinls',
  password: '123123',
});

console.log(account);

console.log(EnumerationBuilder.all(AccountStatus));

const status = EnumerationBuilder.parse(AccountStatus, 'ActivatePending');

console.log(status);
