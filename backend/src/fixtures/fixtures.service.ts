import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FixturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const fixtures = await this.prisma.fixture.findMany({
      orderBy: { kickoffAt: 'asc' },
      include: { homeTeam: true, awayTeam: true },
    });
    return fixtures.map((f) => ({
      ...f,
      homeTeamName: f.homeTeam?.name,
      homeTeamBadge: f.homeTeam?.badge,
      awayTeamName: f.awayTeam?.name,
      awayTeamBadge: f.awayTeam?.badge,
    }));
  }

  async findOne(id: string) {
    const f = await this.prisma.fixture.findUnique({
      where: { id },
      include: { homeTeam: true, awayTeam: true },
    });
    if (!f) return null;
    return {
      ...f,
      homeTeamName: f.homeTeam?.name,
      homeTeamBadge: f.homeTeam?.badge,
      awayTeamName: f.awayTeam?.name,
      awayTeamBadge: f.awayTeam?.badge,
    };
  }
}
