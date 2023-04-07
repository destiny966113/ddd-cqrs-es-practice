import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroKilledDragonEvent } from '../../events/impl/hero-killed-dragon.event';
import { HeroRepository } from '../../repository/hero.repository';
import { KillDragonCommand } from '../impl/kill-dragon.command';

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: KillDragonCommand) {
    console.log(clc.greenBright('KillDragonCommand...'));
    // console.log(this.eventBus)
    this.eventBus;
    HeroKilledDragonEvent;

    const { heroId, dragonId } = command;
    console.log({ command, heroId, dragonId });

    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    hero.killEnemy(dragonId);
    // PUBLISH EVENT
    // KillDragonCommand...
    // HeroKilledDragonEvent...
    // Inside [HeroesGameSagas] Saga -> ofType(HeroKilledDragonEvent)
    // Async DropAncientItemCommand...
    // Async HeroFoundItemEvent...
    hero.commit();

    // this.eventBus.publish(new HeroKilledDragonEvent(heroId, undefined));
  }
}
