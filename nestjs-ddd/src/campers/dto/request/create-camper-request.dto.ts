export class CreateCamperRequest {
  name: string;
  age: number;
  allergies: string[];
}

export class RemoveCamperRequest {
  id: string;
}
