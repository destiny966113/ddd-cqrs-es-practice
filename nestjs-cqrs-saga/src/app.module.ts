import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './domain/product/produdct.module';
import { CatalogModule } from './domain/catalog/catalog.module';
import { DatabaseModule } from './databases/database.module';
import { DatabaseProvider } from './databases/database.provider';

// [Nest] 2649371   - 03/27/2023, 6:19:25 PM   [ExceptionHandler] No repository for "Catalog" was found. Looks like this entity is not registered in current "default" connection? +23ms
@Module({
  imports: [
    DatabaseModule,
    CatalogModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class AppModule {}
