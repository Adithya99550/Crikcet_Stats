Idea plan
Project concept

Build a Cricket Stats Hub for Men’s International Cricket covering all 3 formats:

Test
ODI
T20I

The site should feel like a sports analytics dashboard, not a basic stats page. The visual style should be modern, sleek, and energetic, with motion graphics, glassmorphism cards, animated gradients, and smooth hover interactions.

Core pages
1) Home page

Purpose: give a strong first impression and guide users into the site.

Include:

Hero section with animated headline and cricket-themed background
Short intro about the platform
Featured stats section:
Most runs
Most wickets
Best strike rate
Best average
Top players preview cards
Format switcher for Test / ODI / T20I
Animated charts or stat rings
CTA buttons like:
View Players
View Leaderboards
2) Players page

Purpose: browse and explore all players in the database.

Include:

Search bar
Filter by format
Filter by role:
Batter
Bowler
All-rounder
Wicket-keeper
Sort by:
Runs
Wickets
Average
Strike rate
Player cards with:
Name
Country
Role
Matches
Runs
Wickets
Best score / best bowling
Player profile modal or detail page section
3) Leaderboards page

Purpose: show rankings in a clean, competitive format.

Include:

Tabs for Test / ODI / T20I
Leaderboards for:
Most runs
Most wickets
Best batting average
Best strike rate
Best bowling average
Most centuries
Rank badges
Highlight top 3 with larger cards
Animated progress bars or ranking bars
Database plan

You need minimum 80 players, so use a structured dataset with fields like:

id
name
country
role
formatType or stats per format
matches
innings
runs
wickets
average
strikeRate
hundreds
fifties
bestScore
bestBowling
catches
centuries
fiveWickets
image
careerStatus
Good idea:

Store stats separately for each format:

testStats
odiStats
t20iStats

That makes filtering and leaderboard sorting much easier.

Design style direction

Make it feel like a premium sports product:

Dark theme with deep blues, blacks, and subtle gradients
Glassmorphism cards
Soft glows
Motion on scroll
Smooth page transitions
Animated stat counters
Hover effects on player cards
Clean typography
Responsive layout for mobile and desktop
Recommended tech stack

If you are building this as a modern web project:

Frontend: React / Next.js
Styling: Tailwind CSS
Animation: Framer Motion
Charts: Recharts or Chart.js
Database: Firebase, Supabase, or a JSON-based local dataset for MVP