import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { OpenAccountCommand } from '@shared/commands';
import {
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
  OpenAccountResponse,
} from '@command/common/proto/bank-account-command.pb';
import { OpenAccountDto } from './open-account.dto';
import { AccountType } from '@shared/enums';

@Controller()
export class OpenAccountController {
  constructor() {
    setTimeout(async () => {
      console.log('wwwww');
      await this.openAccount({
        holder: 'holder',
        email: 'email',
        type: AccountType.SAVINGS,
        openingBalance: 100,
      });
    }, 500);
  }

  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_ACCOUNT_COMMAND_SERVICE_NAME, 'OpenAccount')
  private async openAccount(
    @Body() payload: OpenAccountDto,
  ): Promise<OpenAccountResponse> {
    console.log('OpenAccount');
    console.log({
      envFilePath: process.env.IS_DOCKER ? '.docker.env' : '.env',
    });
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, data: command.getId(), error: null };
  }
}
