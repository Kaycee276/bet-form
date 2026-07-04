import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FixturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fixture.findMany({
      orderBy: { kickoffAt: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.fixture.findUnique({ where: { id } });
  }
}
