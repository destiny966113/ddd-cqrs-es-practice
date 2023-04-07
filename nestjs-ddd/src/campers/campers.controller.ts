import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CamperDto } from './camper.dto';
import { CreateCamperCommand } from './commands/create-camper/create-camper.command';
import { RemoveCamperCommand } from './commands/remove-camper/command';
import { UpdateAllergiesCommand } from './commands/update-allergies/update-allergies.command';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';
import { CamperQueryHandlers } from './queries';
import { CampersQuery } from './queries/campers.query';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    setTimeout(async () => {
      console.log('Hey...');
      const camperId = '6423e9f91f4ccd78db44177f';
      await this.createCamper({ name: 'andy', age: 25, allergies: [] });
      // const campers = await this.getCampers();
      // console.log({ campers });
      const response = await this.updateCamperAllergies(camperId, {
        allergies: [],
      });
      console.log({ response });
      // const camper = await this.getCamper(camperId);
      // console.log({ camper });
      await this.removeCamper(camperId);
    }, 500);
  }

  @Delete(':id')
  async removeCamper(@Param('id') camperId: string): Promise<any> {
    console.log('on remove camper controller...');
    await this.commandBus.execute<RemoveCamperCommand, void>(
      new RemoveCamperCommand({ id: camperId }),
    );
  }

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<any> {
    // return "yaya"
    // CamperQueryHandlers
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<CampersQuery, CamperDto[]>(new CampersQuery());
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<string> {
    console.log({ camperId });
    // return
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
    return 'OK';
  }
}
