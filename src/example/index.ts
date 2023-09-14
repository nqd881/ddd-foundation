import { AggregateBuilder, EnumerationBuilder } from '../common';
import { Account } from './account';
import { AccountStatus } from './account-status';

const builder = new AggregateBuilder<Account>(Account);

const account = builder.new({
  username: 'quocdaitinls',
  password: '123123',
});

console.log(account);

const statusBuilder = new EnumerationBuilder(AccountStatus);

console.log(statusBuilder.all());

const status = statusBuilder.parse('ActivatePending');

console.log(status);
