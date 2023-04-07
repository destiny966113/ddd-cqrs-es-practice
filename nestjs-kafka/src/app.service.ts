import { Injectable } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {
    setTimeout(async () => {
      await this.getHello();
    }, 300);
  }

  async getHello() {
    console.log("[getHello]")
    await this.producerService.produce('quickstart', {
      value: 'Hello World',
    });
    return 'Hello World!';
  }
}
