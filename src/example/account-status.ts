import { Enumeration } from '../common';

export class AccountStatus extends Enumeration<string>('AccountStatus') {
  static ActivatePending: AccountStatus = new AccountStatus('ActivatePending');

  static Activated = 'Activated';
}
