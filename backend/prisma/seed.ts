import { PrismaClient, FixtureStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient({});

async function main() {
  const csvPath = path.join(__dirname, 'fixtures.csv');
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const lines = raw.trim().split('\n').slice(1); // skip header

  let count = 0;
  for (const line of lines) {
    // Parse CSV carefully
    const parts = line.split(',');
    const fixtureId = parseInt(parts[0]);
    const homeTeamId = parseInt(parts[1]);
    const homeTeamName = parts[2];
    const homeTeamLogo = parts[3];
    const awayTeamId = parseInt(parts[4]);
    const awayTeamName = parts[5];
    const awayTeamLogo = parts[6];
    const kickoffUtc = parts[7];
    const round = parts[9];
    const venue = parts[10];

    await prisma.fixture.upsert({
      where: { apiFootballId: fixtureId },
      update: {
        homeTeamId,
        homeTeamName,
        homeTeamBadge: homeTeamLogo,
        awayTeamId,
        awayTeamName,
        awayTeamBadge: awayTeamLogo,
        kickoffAt: new Date(kickoffUtc),
        round,
        venue,
        status: FixtureStatus.OPEN,
      },
      create: {
        apiFootballId: fixtureId,
        homeTeamId,
        homeTeamName,
        homeTeamBadge: homeTeamLogo,
        awayTeamId,
        awayTeamName,
        awayTeamBadge: awayTeamLogo,
        kickoffAt: new Date(kickoffUtc),
        round,
        venue,
        status: FixtureStatus.OPEN,
      },
    });
    count++;
  }

  console.log(`Seeded ${count} fixtures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
