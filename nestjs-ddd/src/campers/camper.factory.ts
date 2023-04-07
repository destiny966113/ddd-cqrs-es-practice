import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntityFactory } from '../database/entity.factory';
import { Camper } from './Camper';
import { CamperEntityRepository } from './db/camper-entity.repository';
import { CamperCreatedEvent } from './events/camper-created.event';
import { CamperRemovedEvent } from './events/camper-removed.event';

@Injectable()
export class CamperFactory implements EntityFactory<Camper> {
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
  ) {}

  async remove(id: any): Promise<any> {
    console.log(`remove camper... ${id}`);
    await this.camperEntityRepository.remove(id);
    // console.log(new CamperRemovedEvent(id))
    return;
  }

  async create(
    name: string,
    age: number,
    allergies: string[],
  ): Promise<Camper> {
    const camper = new Camper(
      new ObjectId().toHexString(),
      name,
      age,
      allergies,
    );
    await this.camperEntityRepository.create(camper);
    camper.apply(new CamperCreatedEvent(camper.getId()));
    return camper;
  }
}
