import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { HeroesGameController } from './heroes.controller';
import { QueryHandlers } from './queries/handlers';
import { HeroRepository } from './repository/hero.repository';
import { HeroesGameSagas } from './sagas/heroes.sagas';

@Module({
  imports: [CqrsModule],
  controllers: [HeroesGameController],
  providers: [
    // REPOSITORY
    HeroRepository,
    // COMMAND
    ...CommandHandlers,
    // QUERY
    ...QueryHandlers,
    // EVENT
    ...EventHandlers,
    // SAGA
    HeroesGameSagas,
  ],
})
export class HeroesGameModule {}
