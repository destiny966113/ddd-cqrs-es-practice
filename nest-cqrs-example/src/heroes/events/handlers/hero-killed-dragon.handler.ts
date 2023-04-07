import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { HeroKilledDragonEvent } from '../impl/hero-killed-dragon.event';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  // @Inject(AccountEventProducer)
  // private readonly eventProducer: AccountEventProducer;

  handle(event: HeroKilledDragonEvent) {
    console.log(clc.greenBright('HeroKilledDragonEvent...'));

    // const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);
    // this.eventProducer.produce(constructor.name, event);
  }
}
