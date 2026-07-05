import { PrismaClient, FixtureStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in the environment');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const matchweek1Data = [
  {
    date: 'Fri 21 Aug',
    homeTeam: 'Arsenal',
    awayTeam: 'Coventry City',
    kickoffTime: '20:00',
    venue: 'Emirates Stadium',
  },
  {
    date: 'Sat 22 Aug',
    homeTeam: 'Hull City',
    awayTeam: 'Manchester United',
    kickoffTime: '12:30',
    venue: 'The MKM Stadium',
  },
  {
    date: 'Sat 22 Aug',
    homeTeam: 'Everton',
    awayTeam: 'Crystal Palace',
    kickoffTime: '15:00',
    venue: 'Hill Dickinson Stadium',
  },
  {
    date: 'Sat 22 Aug',
    homeTeam: 'Ipswich Town',
    awayTeam: 'Sunderland',
    kickoffTime: '15:00',
    venue: 'Portman Road',
  },
  {
    date: 'Sat 22 Aug',
    homeTeam: 'Nottingham Forest',
    awayTeam: 'Leeds United',
    kickoffTime: '15:00',
    venue: 'The City Ground',
  },
  {
    date: 'Sat 22 Aug',
    homeTeam: 'Brentford',
    awayTeam: 'Tottenham Hotspur',
    kickoffTime: '17:30',
    venue: 'Gtech Community Stadium',
  },
  {
    date: 'Sun 23 Aug',
    homeTeam: 'Brighton and Hove Albion',
    awayTeam: 'Aston Villa',
    kickoffTime: '14:00',
    venue: 'American Express Stadium',
  },
  {
    date: 'Sun 23 Aug',
    homeTeam: 'Manchester City',
    awayTeam: 'Bournemouth',
    kickoffTime: '14:00',
    venue: 'Etihad Stadium',
  },
  {
    date: 'Sun 23 Aug',
    homeTeam: 'Newcastle United',
    awayTeam: 'Liverpool',
    kickoffTime: '16:30',
    venue: "St. James' Park",
  },
  {
    date: 'Mon 24 Aug',
    homeTeam: 'Fulham',
    awayTeam: 'Chelsea',
    kickoffTime: '20:00',
    venue: 'Craven Cottage',
  },
];

function parseKickoff(dateStr: string, timeStr: string): Date {
  // Extract just the day and month (e.g., "21 Aug")
  const match = dateStr.match(/\d+\s+[A-Za-z]+/);
  const dayMonth = match ? match[0] : '01 Aug';

  // Construct a standard string format. Assuming UK time (BST) or UTC
  // "21 Aug 2026 20:00:00 GMT+0100" (BST is GMT+1)
  const dateString = `${dayMonth} 2026 ${timeStr}:00 GMT+0100`;
  return new Date(dateString);
}

function getFixtureStatus(kickoffAt: Date): FixtureStatus {
  const now = new Date();
  const timeDiffMs = kickoffAt.getTime() - now.getTime();
  const hoursDiff = timeDiffMs / (1000 * 60 * 60);

  // Implement the status lifecycle rules based on match time
  if (hoursDiff > 12) {
    return FixtureStatus.OPEN;
  } else if (hoursDiff <= 12 && hoursDiff > 0.5) {
    return FixtureStatus.LOCKED;
  } else if (hoursDiff <= 0.5 && hoursDiff > -3) {
    // 30 mins before the match and during the match (approx 3 hours)
    return FixtureStatus.SQUAD_PENDING;
  } else {
    // Matches far in the past
    return FixtureStatus.SETTLED;
  }
}

async function main() {
  console.log(
    'Seeding 2026 Premier League Matchweek 1 fixtures from local data...',
  );
  console.log(
    `Found ${matchweek1Data.length} fixtures. Inserting to database...`,
  );

  // Clear existing fixtures to avoid any conflicts since we changed the schema
  // We can't rely on `apiFootballId` to upsert anymore
  // Wait, if there are existing fixtures and squads, deleting them might be dangerous.
  // But the user said "just update the new ones, the table is basically empty"
  // Since we don't have a reliable unique identifier (like apiFootballId) in the local JSON except maybe [homeTeamName, awayTeamName, date],
  // we can use findFirst and update, or just create if it doesn't exist.

  let count = 0;
  for (const item of matchweek1Data) {
    const kickoffDate = parseKickoff(item.date, item.kickoffTime);
    const status = getFixtureStatus(kickoffDate);

    // Try to find if this fixture already exists by checking the teams and round
    const existingFixture = await prisma.fixture.findFirst({
      where: {
        league: 'Premier League',
        homeTeamName: item.homeTeam,
        awayTeamName: item.awayTeam,
        round: 'Matchweek 1',
      },
    });

    if (existingFixture) {
      await prisma.fixture.update({
        where: { id: existingFixture.id },
        data: {
          kickoffAt: kickoffDate,
          venue: item.venue,
          status: status,
        },
      });
    } else {
      await prisma.fixture.create({
        data: {
          league: 'Premier League',
          homeTeamName: item.homeTeam,
          awayTeamName: item.awayTeam,
          kickoffAt: kickoffDate,
          round: 'Matchweek 1',
          venue: item.venue,
          status: status,
        },
      });
    }

    count++;
  }

  console.log(`✅ Successfully seeded ${count} fixtures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
