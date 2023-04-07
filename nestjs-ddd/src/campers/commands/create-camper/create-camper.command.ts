import { CreateCamperRequest } from '../../dto/request/create-camper-request.dto';

// export class CreateCamperRequest {
//   name: string;
//   age: number;
//   allergies: string[];
// }

export class CreateCamperCommand {
  constructor(public readonly createCamperRequest: CreateCamperRequest) {}
}
