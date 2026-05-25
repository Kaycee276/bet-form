# Requirements Document

## 1. Application Overview

### 1.1 Application Name

BetForm

### 1.2 Application Description

A World Cup 2026 tactical prediction web application where users predict starting formations and starting XI for upcoming matches, competing on a skill-based leaderboard with an odds-based scoring system. No real money involved.

## 2. Users and Usage Scenarios

### 2.1 Target Users

- Football fans interested in tactical analysis
- Users who want to test their lineup prediction skills
- Competitive users seeking leaderboard ranking

### 2.2 Core Usage Scenarios

- Browse upcoming World Cup 2026 fixtures
- Submit formation and starting XI predictions before match lockdown
- View prediction results after matches settle
- Track personal and global ranking on leaderboard

## 3. Page Structure and Functionality

### 3.1 Page Hierarchy

```
BetForm
├── Home/Fixtures (default landing page)
├── Prediction Screen (per fixture per team)
├── Leaderboard
├── Settings
│   ├── Profile Management
│   ├── How Scoring Works Modal
│   └── Admin Section (conditional)
└── Onboarding (first login only)
```

### 3.2 Detailed Functionality by Page

#### 3.2.1 Home/Fixtures Page

- Display all World Cup 2026 fixtures grouped by date, sorted chronologically
- Each fixture card shows:
  + Home team badge, name
  + Away team badge, name
  + Kickoff time in user's local timezone
  + Round label
  + Status badge (OPEN / LOCKED / SETTLED / SQUAD_PENDING / PENDING_SETTLEMENT)
- Tap fixture card to navigate to Prediction Screen
- Locked or Settled fixtures remain tappable to view submitted predictions (read-only)
- Sticky bottom navigation with 3 tabs: Fixtures, Leaderboard, Settings

#### 3.2.2 Prediction Screen

- User selects which team's lineup to predict (home or away)
- One prediction allowed per team per fixture
- Step indicator: Formation → XI → Review → Submitted

**Step 1: Formation Selection**

- Dropdown listing 15 formations with odds displayed next to each:
  + 4-3-3 (1.4), 4-2-3-1 (1.5), 4-4-2 (1.8), 4-1-4-1 (2.0), 4-5-1 (2.2), 4-3-2-1 (2.5), 3-5-2 (2.8), 3-4-3 (3.0), 3-4-2-1 (3.2), 5-3-2 (3.5), 5-4-1 (3.8), 3-3-3-1 (4.0), 4-4-1-1 (3.0), 4-2-2-2 (3.5), 4-3-1-2 (3.2)
- Formation slots per formation:
  + 4-3-3: GK, RB, CB, CB, LB, CM, CM, CM, RW, ST, LW
  + 4-2-3-1: GK, RB, CB, CB, LB, CDM, CDM, RAM, CAM, LAM, ST
  + 4-4-2: GK, RB, CB, CB, LB, RM, CM, CM, LM, ST, ST
  + 4-1-4-1: GK, RB, CB, CB, LB, CDM, RM, CM, CM, LM, ST
  + 4-5-1: GK, RB, CB, CB, LB, RM, CM, CM, CM, LM, ST
  + 4-3-2-1: GK, RB, CB, CB, LB, CM, CM, CM, RAM, LAM, ST
  + 3-5-2: GK, CB, CB, CB, RWB, CM, CM, CM, LWB, ST, ST
  + 3-4-3: GK, CB, CB, CB, RM, CM, CM, LM, RW, ST, LW
  + 3-4-2-1: GK, CB, CB, CB, RWB, CM, CM, LWB, RAM, LAM, ST
  + 5-3-2: GK, RWB, CB, CB, CB, LWB, CM, CM, CM, ST, ST
  + 5-4-1: GK, RWB, CB, CB, CB, LWB, RM, CM, CM, LM, ST
  + 3-3-3-1: GK, CB, CB, CB, CM, CM, CM, RW, CAM, LW, ST
  + 4-4-1-1: GK, RB, CB, CB, LB, RM, CM, CM, LM, CAM, ST
  + 4-2-2-2: GK, RB, CB, CB, LB, CDM, CDM, RAM, LAM, ST, ST
  + 4-3-1-2: GK, RB, CB, CB, LB, CM, CM, CM, CAM, ST, ST
- Step 2 unlocks after formation selected

**Step 2: Starting XI Selection**

- 11 slot dropdowns corresponding to selected formation
- Each slot labeled with position name and slot odd:
  + GK: 1.2, CB: 1.5, RB: 1.8, LB: 1.8, RWB: 2.0, LWB: 2.0, CDM: 2.0, CM: 2.2, CAM: 2.5, RAM: 2.3, LAM: 2.3, RM: 2.2, LM: 2.2, RW: 2.5, LW: 2.5, ST: 2.8
- Dropdown filters players by position:
  + GK slots show only Goalkeepers
  + DEF slots (CB, RB, LB, RWB, LWB) show only Defenders
  + MID slots (CDM, CM, CAM, RAM, LAM, RM, LM) show only Midfielders
  + ATT slots (RW, LW, ST) show only Attackers
- Selected players removed from other dropdowns
- Live pitch visual updates as players selected (displayed below form on mobile)
- Pitch visual: dark green background (#0D1F0D) with white lines, mint dashed circles for empty slots, mint filled dots with name labels for selected players

**Step 3: Review and Submit**

- Display full prediction summary: formation with odd, all 11 players with slot and odd
- Submit button disabled until all 11 slots filled
- After submit, prediction locked immediately (no edits allowed)
- Confirmation screen shows submitted prediction with odds

**Post-Submit View**

- Read-only summary of submitted prediction
- If match settled, display final scores:
  + Formation score (formation_odd × 2 if correct, else 0)
  + Each player's final score (proximity_score × slot_odd)
  + Total score

#### 3.2.3 Leaderboard Page

- Global ranking table displaying:
  + Rank
  + Avatar
  + Username
  + Total points (sum of all prediction scores)
  + Predictions made (count)
  + Average score (rounded to 1 decimal place)
- Sorted by total points descending
- Tiebreak by sum of odds
- Current user's row highlighted in mint (#00FFB2)

#### 3.2.4 Settings Page

- Google sign-in/sign-out button
- Edit username field
- \"How Scoring Works\" button (opens modal)
- Admin section (visible only if user email matches admin@betform.com):
  + Manual lineup input form for PENDING_SETTLEMENT matches
  + Input fields: fixture selection, formation, 11 player selections
  + Submit to manually settle predictions

#### 3.2.5 Onboarding (First Login)

- Prompt user to set username
- Display \"How Scoring Works\" explanation modal

#### 3.2.6 How Scoring Works Modal

- Accessible from Onboarding and Settings
- Plain language explanation of:
  + Formation scoring: formation_odd × 2 if correct, else 0
  + Player scoring: proximity_score × slot_odd
  + Proximity scoring table (exact match = 10, proximity by position closeness, default = 1, non-starter = 0)
  + Total score calculation: formation_final_score + sum of all player_final_scores
  + All numbers displayed rounded to 1 decimal place

## 4. Business Rules and Logic

### 4.1 Authentication

- Google OAuth via Supabase Auth
- On first login, user must set username
- All predictions tied to authenticated user ID
- Admin check: user email === kizuaba@gmail.com

### 4.2 Fixture Status Logic

- **OPEN**: kickoff >24 hours away AND squad data available
- **LOCKED**: midnight WAT (UTC+1) on match day morning
- **SQUAD_PENDING**: squad data not yet confirmed
- **SETTLED**: lineups confirmed + predictions scored
- **PENDING_SETTLEMENT**: match ended, lineup API empty (retry every 10 minutes)
- Manual override: admin can input formation + XI from Settings to force settlement

### 4.3 Prediction Submission Rules

- User can submit one prediction per team per fixture
- Prediction must include formation + 11 players
- Submission locked after submit (no edits)
- Submission disabled once fixture status changes to LOCKED

### 4.4 Squad Data Rules

- Players filtered by position for slot dropdowns
- Selected players removed from other dropdowns to prevent duplicates
- Squad data sourced from API-Football via Supabase edge function

### 4.5 Lineup Confirmation Rules

- Player counts as starter only if in startXI from API-Football
- If player substituted off in first 5 minutes, replacement counts as starter
- Check substitution events before minute 6 using API-Football events endpoint

### 4.6 Scoring Calculation

- **Formation Score**: formation_odd × 2 if user's formation matches confirmed formation, else 0
- **Player Score**: getProximityScore(userSlot, actualPosition) × slot_odd
  + Proximity score determined by full proximity table
  + Exact match = 10
  + Proximity by position closeness (full table in backend logic)
  + Default fallback = 1 if combo not listed
  + Non-starter = 0
- **Total Score**: formation_final_score + sum of all 11 player_final_scores
- All scores rounded to 1 decimal place for display

### 4.7 Leaderboard Ranking

- Sorted by total points descending
- Tiebreak by sum of odds from all predictions
- Recalculated after each match settlement

### 4.8 Data Persistence

- All data stored in Supabase (no localStorage)
- Fixtures cached in fixtures table
- Squads cached in squads table
- Predictions stored in predictions table
- Leaderboard generated from leaderboard view

### 4.9 API-Football Integration

- All API calls made from Supabase edge functions (never client-side)
- API key stored as APIFOOTBALL_KEY in edge function environment variables
- API base URL: https://v3.football.api-sports.io
- League ID: 1 (World Cup)
- Season: 2026

### 4.10 Edge Function Logic

**sync-fixtures**

- Called daily via Supabase cron and on-demand
- GET /fixtures?league=1&season=2026
- Upsert all fixtures into fixtures table
- Apply status logic based on kickoff time and squad availability

**sync-squads**

- Called once per team when fixture appears
- GET /players/squads?team={team_id}
- Upsert players into squads table
- If response empty, mark fixture as SQUAD_PENDING, retry next day

**fetch-lineups**

- Called after each match ends
- GET /fixtures/lineups?fixture={fixture_id}
- If empty → set PENDING_SETTLEMENT, retry in 10 minutes
- If exists → store confirmed formation + startXI in fixtures table
- Check substitution events: GET /fixtures/events?fixture={id}
- Trigger settle-predictions after lineup confirmed

**settle-predictions**

- Triggered after lineups confirmed
- For each unsettled prediction:
  + Score formation (formation_odd × 2 if correct, else 0)
  + Score each player using proximity table × slot_odd
  + Sum into total_score
  + Mark prediction as settled

## 5. Exceptions and Edge Cases

| Scenario                              | Handling                                                       |
| ------------------------------------- | -------------------------------------------------------------- |
| Squad data unavailable                | Mark fixture as SQUAD_PENDING, retry next day                  |
| Lineup API empty after match          | Set PENDING_SETTLEMENT, retry every 10 minutes                 |
| Player substituted in first 5 minutes | Replacement counts as starter                                  |
| User submits after lockdown           | Submission disabled, show error message                        |
| Duplicate player selection            | Prevent via dropdown filtering                                 |
| Admin manual override                 | Admin inputs formation + XI from Settings, triggers settlement |
| User not authenticated                | Redirect to Google sign-in                                     |
| Username not set                      | Prompt username setup on first login                           |
| Leaderboard tie                       | Tiebreak by sum of odds                                        |
| API-Football rate limit               | Retry with exponential backoff                                 |
| Network error during submission       | Show error message, allow retry                                |

## 6. Acceptance Criteria

1. User signs in with Google and sets username on first login
2. User views list of World Cup 2026 fixtures on Home page
3. User taps OPEN fixture and navigates to Prediction Screen
4. User selects formation from dropdown (e.g., 4-3-3 with odd 1.4)
5. User selects 11 players from slot dropdowns, pitch visual updates live
6. User submits prediction, confirmation screen displays submitted prediction with odds
7. After match settles, user views final score breakdown on Prediction Screen
8. User checks Leaderboard and sees personal rank highlighted in mint

## 7. Out of Scope for This Release

- Real money betting or transactions
- localStorage usage (all data in Supabase)
- Other leagues beyond World Cup 2026 (league ID 1, season 2026)
- Social features (comments, sharing, following)
- Push notifications
- In-app chat or messaging
- Multi-language support beyond English
- Dark/light theme toggle (fixed dark theme)
- Prediction editing after submission
- Historical data beyond World Cup 2026
- Mobile app (iOS/Android native)
- Email notifications
- Password-based authentication (Google OAuth only)
- Custom avatar upload (uses Google profile photo)
- Team/player statistics beyond squad data
- Live match updates or scores
- Prediction analytics or insights
- Export/download prediction history
