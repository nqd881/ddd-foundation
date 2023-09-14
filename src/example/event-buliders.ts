import { DomainEventBuilder } from '../common';
import { AccountCreatedEvent } from './account-created.event';

export const AccountCreatedEventBuilder = new DomainEventBuilder(AccountCreatedEvent);
