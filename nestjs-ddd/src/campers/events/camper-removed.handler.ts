import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CamperRemovedEvent } from './camper-removed.event';

@EventsHandler(CamperRemovedEvent)
export class CamperremovedHandler implements IEventHandler<CamperRemovedEvent> {
  // Camper removed: 6423e9f91f4ccd78db44177f
  async handle({ camperId }: CamperRemovedEvent): Promise<void> {
    console.log('Camper removed:', camperId);
  }
}
