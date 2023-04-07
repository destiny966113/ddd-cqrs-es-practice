import { RemoveCamperRequest } from '../../dto/request/create-camper-request.dto';

export class RemoveCamperCommand {
  constructor(public readonly removeCamperRequest: RemoveCamperRequest) {}
}
