import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AccountOpenedEvent } from '@shared/events';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedHandler implements IEventHandler<AccountOpenedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: AccountOpenedEvent): void {
    console.log('[AccountOpenedHandler] kafka producer send event');
    const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);

    const { name } = constructor;
    // constructor: [class AccountOpenedEvent extends BaseEvent]
    console.log({ name, event, constructor });

    // this.eventProducer.produce(constructor.name, event);
    this.eventProducer.produce('quickstart', event);
    // const eventExample = {
    //   id: '84f6a7e2-8e04-45f9-9eb5-d6d02c611144',
    //   holder: 'holder',
    //   email: 'email',
    //   type: 'SAVINGS',
    //   openingBalance: 100,
    //   createdDate: '2023-04-06T06:39:23.698Z',
    //   version: 0,
    // };
  }
}
