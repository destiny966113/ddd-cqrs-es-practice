import { CreateCamperHandler } from './create-camper/create-camper.handler';
import { RemoveCamperHandler } from './remove-camper/handler';
import { UpdateAllergiesHandler } from './update-allergies/update-allergies.handler';

export const CamperCommandHandlers = [
  CreateCamperHandler,
  UpdateAllergiesHandler,
  RemoveCamperHandler
];
