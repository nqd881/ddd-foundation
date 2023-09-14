import { Enumeration } from '../common';

export class AccountStatus extends Enumeration<string>('AccountStatus') {
  static ActivatePending = new AccountStatus('ActivatePending');
  static Activated = new AccountStatus('Activated');
}
