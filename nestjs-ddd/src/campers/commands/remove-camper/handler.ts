import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CamperEntityRepository } from 'src/campers/db/camper-entity.repository';
import { CamperFactory } from '../../camper.factory';
import { RemoveCamperCommand } from './command';

@CommandHandler(RemoveCamperCommand)
export class RemoveCamperHandler
  implements ICommandHandler<RemoveCamperCommand> {
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ removeCamperRequest }: RemoveCamperCommand): Promise<void> {
    const { id } = removeCamperRequest;
    console.log('removeCamperRequest', { id });
    await this.camperFactory.remove(id);
    // const camper = this.eventPublisher.mergeObjectContext(
    //   await this.camperFactory.remove(id),
    // );
    // const camper = this.eventPublisher.mergeObjectContext(
    //   await this.camperFactory.remove(id),
    // );
    // camper.commit();
  }
}
