import { Controller, Get, Param } from '@nestjs/common';
import { FixturesService } from './fixtures.service.js';

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Get()
  findAll() {
    return this.fixturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fixturesService.findOne(id);
  }
}
