import { ValueObject } from '../common';

export type PasswordProps = {
  value: string;
  hashed: boolean;
};

export class Password extends ValueObject<PasswordProps>('Password') {
  validateProps(props: PasswordProps): void {}
}
