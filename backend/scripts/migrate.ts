import { PrismaClient } from '@prisma/client';
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

async function main() {
  console.log('Running raw SQL migrations...');
  
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "fixtures" ADD COLUMN IF NOT EXISTS "league" TEXT NOT NULL DEFAULT 'Premier League';`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "fixtures" DROP COLUMN IF EXISTS "api_football_id";`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "fixtures" DROP COLUMN IF EXISTS "home_team_id";`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "fixtures" DROP COLUMN IF EXISTS "away_team_id";`);
    
    await prisma.$executeRawUnsafe(`ALTER TABLE "squads" DROP CONSTRAINT IF EXISTS "squads_fixture_id_team_id_player_id_key";`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "squads" ADD COLUMN IF NOT EXISTS "team_name" TEXT NOT NULL DEFAULT 'Unknown';`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "squads" DROP COLUMN IF EXISTS "team_id";`);
    
    // Add unique constraint only if we dropped the old one
    try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "squads" ADD CONSTRAINT "squads_fixture_id_team_name_player_id_key" UNIQUE ("fixture_id", "team_name", "player_id");`);
    } catch(e) {
        console.log('Constraint may already exist.');
    }
    
    console.log('✅ Migrations successful');
  } catch (err) {
    console.error('❌ Error during migrations:', err);
  }
}

main().finally(() => prisma.$disconnect());
