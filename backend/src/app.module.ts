import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { FixturesModule } from './fixtures/fixtures.module.js';

@Module({
  imports: [PrismaModule, FixturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
