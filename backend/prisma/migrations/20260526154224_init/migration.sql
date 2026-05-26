-- CreateEnum
CREATE TYPE "FixtureStatus" AS ENUM ('OPEN', 'LOCKED', 'SQUAD_PENDING', 'PENDING_SETTLEMENT', 'SETTLED');

-- CreateEnum
CREATE TYPE "TeamSide" AS ENUM ('HOME', 'AWAY');

-- CreateEnum
CREATE TYPE "PlayerPosition" AS ENUM ('GK', 'DEF', 'MID', 'ATT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "supabase_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar_url" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixtures" (
    "id" TEXT NOT NULL,
    "api_football_id" INTEGER NOT NULL,
    "home_team_id" INTEGER NOT NULL,
    "home_team_name" TEXT NOT NULL,
    "home_team_badge" TEXT,
    "away_team_id" INTEGER NOT NULL,
    "away_team_name" TEXT NOT NULL,
    "away_team_badge" TEXT,
    "kickoff_at" TIMESTAMP(3) NOT NULL,
    "round" TEXT NOT NULL,
    "status" "FixtureStatus" NOT NULL DEFAULT 'SQUAD_PENDING',
    "home_formation" TEXT,
    "away_formation" TEXT,
    "home_start_xi" JSONB,
    "away_start_xi" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fixtures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "squads" (
    "id" TEXT NOT NULL,
    "fixture_id" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "team_side" "TeamSide" NOT NULL,
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT NOT NULL,
    "position" "PlayerPosition" NOT NULL,
    "shirt_number" INTEGER,
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "squads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "fixture_id" TEXT NOT NULL,
    "team_side" "TeamSide" NOT NULL,
    "formation" TEXT NOT NULL,
    "formation_odd" DOUBLE PRECISION NOT NULL,
    "formation_score" DOUBLE PRECISION,
    "total_score" DOUBLE PRECISION,
    "is_settled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prediction_players" (
    "id" TEXT NOT NULL,
    "prediction_id" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "slot_odd" DOUBLE PRECISION NOT NULL,
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT NOT NULL,
    "proximity_score" DOUBLE PRECISION,
    "player_score" DOUBLE PRECISION,

    CONSTRAINT "prediction_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_supabase_id_key" ON "users"("supabase_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "fixtures_api_football_id_key" ON "fixtures"("api_football_id");

-- CreateIndex
CREATE UNIQUE INDEX "squads_fixture_id_team_id_player_id_key" ON "squads"("fixture_id", "team_id", "player_id");

-- CreateIndex
CREATE UNIQUE INDEX "predictions_user_id_fixture_id_team_side_key" ON "predictions"("user_id", "fixture_id", "team_side");

-- AddForeignKey
ALTER TABLE "squads" ADD CONSTRAINT "squads_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_fixture_id_fkey" FOREIGN KEY ("fixture_id") REFERENCES "fixtures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prediction_players" ADD CONSTRAINT "prediction_players_prediction_id_fkey" FOREIGN KEY ("prediction_id") REFERENCES "predictions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
