import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'quickstart' },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log({
          "【consumer received value】": message.value.toString(),
        });
        throw new Error('Test error!');
      },
    });
  }
}
