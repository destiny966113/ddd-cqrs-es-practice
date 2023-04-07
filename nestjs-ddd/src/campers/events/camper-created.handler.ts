import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  // Camper Created: 6423e9f91f4ccd78db44177f
  async handle({ camperId }: CamperCreatedEvent): Promise<void> {
    console.log('Camper Created:', camperId);
  }
}
