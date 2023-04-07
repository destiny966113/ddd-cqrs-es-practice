import { UsersController } from '@/controllers/users.controller'
import { UsersService } from '@/services/users.service'
import { AutomapperModule } from '@automapper/nestjs'
import { pojos } from '@automapper/pojos'
import { HealthController } from '@controllers/health.controller'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import configuration from './configuration'
import { UsersProfile } from './users.profile'

import {
    CreateUserCommandHandler, ModifyUserCommandHandler, RemoveUserCommandHandler,
    SendEmailCommandHandler
} from '@commands/handlers/index'
import {
    UserCreatedEventHandler, UserModifiedEventHandler, UserRemovedEventHandler
} from '@events/handlers/index'
import {
    GetAllUsersQueryHandler,
    GetSearchUsersQueryHandler
} from '@queries/handlers/index'
import { UsersSaga } from '@sagas/users.saga'
import { MessagingService } from '@services/messaging.service'
import { PrismaService } from '@services/prisma.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [configuration],
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                exchanges: [
                    {
                        name: configService.get<string>('rabbitmq.exchange'),
                        type: 'topic',
                    },
                ],
                uri: configService.get<string>('rabbitmq.host'),
                connectionInitOptions: { wait: true },
            }),
        }),
        CqrsModule,
        TerminusModule,
        AutomapperModule.forRoot({
            options: [{ name: 'userMapper', pluginInitializer: pojos }],
            singular: true,
        }),
    ],
    controllers: [HealthController, UsersController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        ConfigService,
        MessagingService,
        UsersService,
        PrismaService,
        UsersProfile,
        GetAllUsersQueryHandler,
        GetSearchUsersQueryHandler,
        CreateUserCommandHandler,
        ModifyUserCommandHandler,
        RemoveUserCommandHandler,
        SendEmailCommandHandler,
        UserCreatedEventHandler,
        UserModifiedEventHandler,
        UserRemovedEventHandler,
        UsersSaga,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(RequestContextMiddleware).forRoutes('*');
    }
}
