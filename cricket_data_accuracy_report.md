# Cricket Player Dataset - Data Accuracy Analysis Report

**Dataset:** `C:\PROJECT\cricket-stats\src\data\players.js`
**Total Players Analyzed:** 82
**Total Issues Identified:** 148
**Analysis Date:** March 29, 2026

---

## Executive Summary

The cricket player dataset contains significant data accuracy issues that affect its credibility and usability. The most critical problems are:

1. **3 duplicate player entries** (Shakib Al Hasan x2, Mehidy Hasan x2, Trent Boult x2)
2. **128 bowling average calculation errors** - The average field does not match runs/wickets for bowlers
3. **11 best score inconsistencies** - Players credited with hundreds despite best scores below 100
4. **Systemic data modeling issues** - The "average" field appears to represent different metrics across roles
5. **Redundant field design** - Both "hundreds" and "centuries" fields exist with identical values

---

## CRITICAL SEVERITY ISSUES

### 1. Duplicate Player Entries

Duplicate entries inflate player counts and cause data redundancy. These must be removed.

#### Shakib Al Hasan (Bangladesh, All-rounder)
- **Entry 1:** ID 9 (lines 94-104)
  - testStats: 70 matches, 120 innings, 3800 runs, 230 wickets, average: 39.0
  - odiStats: 240 matches, 220 innings, 7185 runs, 313 wickets, average: 37.93
  - t20iStats: 120 matches, 110 innings, 1800 runs, 140 wickets, average: 22.0
- **Entry 2:** ID 53 (lines 581-591) - **EXACT DUPLICATE**
- **Action:** Remove one duplicate (keep the first occurrence, ID 9)

#### Mehidy Hasan (Bangladesh, All-rounder)
- **Entry 1:** ID 25 (lines 274-282)
  - testStats: 65 matches, 100 innings, 2800 runs, 85 wickets, average: 28.0
  - odiStats: 120 matches, 100 innings, 1800 runs, 110 wickets, average: 25.0
  - t20iStats: 80 matches, 60 innings, 800 runs, 90 wickets, average: 20.0
- **Entry 2:** ID 54 (lines 593-602) - **EXACT DUPLICATE**
- **Action:** Remove one duplicate (keep the first occurrence, ID 25)

#### Trent Boult (New Zealand, Bowler)
- **Entry 1:** ID 27 (lines 295-304)
  - testStats: 85 matches, 140 innings, 1200 runs, 320 wickets, average: 28.0
  - odiStats: 110 matches, 100 innings, 500 runs, 210 wickets, average: 24.0
  - t20iStats: 100 matches, 100 innings, 300 runs, 170 wickets, average: 22.0
- **Entry 2:** ID 62 (lines 682-691) - **EXACT DUPLICATE**
- **Action:** Remove one duplicate (keep the first occurrence, ID 27)

---

## HIGH SEVERITY ISSUES

### 2. Bowling Average Calculation Errors (128 occurrences)

**Problem:** For nearly all bowlers and many all-rounders, the `average` field does NOT equal `runs/wickets`. This indicates either:
- The `average` field is not the bowling average but some other unspecified metric
- The data is incorrectly calculated
- The data model is fundamentally flawed

**Examples:**

#### Glenn Maxwell (Australia, All-rounder)
- **t20iStats:** runs: 2500, wickets: 40, average: 30.0
- **Expected bowling average:** 2500/40 = 62.50
- **Discrepancy:** The stated average (30.0) is half the calculated value
- **Impact:** Users cannot trust bowling average statistics

#### Haris Rauf (Pakistan, Bowler)
- **testStats:** runs: 80, wickets: 30, average: 30.0 (expected: 2.67)
- **odiStats:** runs: 120, wickets: 90, average: 28.0 (expected: 1.33)
- **t20iStats:** runs: 100, wickets: 130, average: 22.0 (expected: 0.77)
- **Pattern:** In all formats, the stated average is vastly different from runs/wickets

#### Adam Zampa (Australia, Bowler)
- **testStats:** runs: 100, wickets: 40, average: 35.0 (expected: 2.50)
- **odiStats:** runs: 200, wickets: 160, average: 28.0 (expected: 1.25)
- **t20iStats:** runs: 100, wickets: 130, average: 24.0 (expected: 0.77)

#### James Anderson (England, Bowler)
- **testStats:** runs: 1600, wickets: 704, average: 26.45 (expected: 2.27)
- **odiStats:** runs: 400, wickets: 269, average: 32.0 (expected: 1.49)

**Pattern Analysis:**
- The pattern is consistent across **ALL bowlers** (around 40 bowlers affected)
- The stated "average" values are in the range of 20-35, which are realistic bowling averages
- But the calculated runs/wickets are very low (typically 0.5-5.0), which seems impossibly good
- **Conclusion:** Either:
  1. The `runs` and `wickets` fields are NOT career totals (maybe per-match averages or something else entirely)
  2. The `average` field represents a different statistic entirely (maybe it's just a placeholder)

**Action Required:**
- Clarify the data source and what each field represents
- Either correct the values to be consistent OR rename fields to avoid confusion
- At minimum, add documentation explaining what "average" and "strikeRate" mean for each role

### 3. Best Score vs Hundreds Inconsistency (11 occurrences)

**Problem:** Players are credited with centuries (hundreds > 0) but their `bestScore` is less than 100. This is logically impossible.

#### Pat Cummins (Australia, Bowler)
- **testStats:** hundreds: 1, bestScore: 40
- **Issue:** A score of 40 cannot be a century

#### Ross Taylor (New Zealand, Batter)
- **t20iStats:** hundreds: 2, bestScore: 90
- **Issue:** Best score of 90 cannot support 2 centuries

#### Mitchell Marsh (Australia, All-rounder)
- **t20iStats:** hundreds: 1, bestScore: 81

#### Alex Carey (Australia, Wicket-keeper)
- **t20iStats:** hundreds: 1, bestScore: 82

#### Jonny Bairstow (England, Wicket-keeper)
- **t20iStats:** hundreds: 1, bestScore: 84

#### Tamim Iqbal (Bangladesh, Batter)
- **t20iStats:** hundreds: 1, bestScore: 88

#### Shan Masood (Pakistan, Batter)
- **odiStats:** hundreds: 1, bestScore: 95

#### Faf du Plessis (South Africa, Batter)
- **t20iStats:** hundreds: 1, bestScore: 85

#### Dominic Dragg (England, All-rounder)
- **testStats:** hundreds: 1, bestScore: 85
- **odiStats:** (also has issues)

#### Prithvi Shaw (India, Batter)
- **odiStats:** hundreds: 1, bestScore: 73

**Action Required:**
- Either correct the `hundreds` count to 0, OR
- Correct the `bestScore` to be at least 100 if a century exists

---

## MEDIUM SEVERITY ISSUES

### 4. Hundreds/Fifties Relationship Error

#### Pat Cummins (Australia, Bowler) - testStats
- hundreds: 1, fifties: 0
- **Issue:** Every century (100+) is also a fifty (50+). The fifties count should be **at least** equal to hundreds.
- **Correct value:** fifties should be ≥ 1

### 5. Hundreds/Fifties Duplicate Counting

In the dataset, both `hundreds` and `centuries` fields exist and appear to be duplicates. This is a redundant design that could cause confusion. While they currently match (same values), having two fields for the same statistic is poor data modeling.

---

## LOW SEVERITY ISSUES

### 6. All-rounders with Minimal Batting Contribution

Some all-rounders have very low run totals relative to their matches, suggesting they are primarily bowlers.

#### Ashton Agar (Australia, All-rounder) - t20iStats
- matches: 45, runs: 400
- Runs per match: 8.9 (very low for an all-rounder)
- Note: This is plausible if he's a bowling-dominant all-rounder, but worth verifying

#### R ashwin (India, All-rounder) - t20iStats
- matches: 70, runs: 200
- Runs per match: 2.9 (extremely low)
- This suggests he may be more of a specialist bowler

### 7. Bowlers with Unusually High Batting Stats

#### Tim Southee (New Zealand, Bowler) - testStats
- hundreds: 1, fifties: 5
- A bowler scoring a Test century is notable but not impossible. However, combined with 2500 runs, he might be better classified as an all-rounder.

---

## ADDITIONAL OBSERVATIONS & DATA QUALITY CONCERNS

### 8. Data Model Issues

The dataset exhibits a fundamental ambiguity: the `average` and `strikeRate` fields are used for both batting and bowling statistics without differentiation. The values suggest:

- **For batters:** `average` appears to be batting average; `strikeRate` is batting strike rate (runs per 100 balls). Values seem plausible: Test SR typically 40-60, ODI 70-100, T20 120-150.
- **For bowlers:** `average` appears NOT to be bowling average (runs/wicket) since that would be impossibly low given the runs/wickets values. It may be:
  - A placeholder
  - Some derived metric not defined in the schema
  - Incorrect data

The same applies to `strikeRate`:
- For batsmen: balls per 100 runs (or runs per 100 balls) - values 40-150 are plausible
- For bowlers: bowling strike rate = balls per wicket. With no "balls bowled" field, we cannot verify this

**Recommendation:** Either:
1. Separate the fields: `battingAverage`, `battingStrikeRate`, `bowlingAverage`, `bowlingStrikeRate`
2. Or clearly document what these fields represent in each context

### 9. Potentially Missing Fields

- **No "not outs" field:** Batting average depends on dismissals, not innings. Without tracking not outs, we cannot verify batting averages.
- **No "balls faced" or "balls bowled" fields:** Makes strike rate calculations unverifiable.
- **No "overs" or " deliveries" information:** Needed to assess workload and bowling stats.

### 10. Zero or Missing Stats

No obvious cases of players with >0 matches but 0 runs (for non-bowlers) were found. This is good. However, some players have very minimal presence in certain formats (e.g., 5-10 matches), which is realistic for squad members.

### 11. Career Status Concerns

No obvious mismatches between career status and typical retirement status were detected. However, without cross-referencing with known real-world retirement dates, this cannot be fully validated.

### 12. Role Assignment

Some players classified as "Bowler" have notable batting records (e.g., Tim Southee with 2500 Test runs and a century). While not incorrect, they might better fit "All-rounder". Consider reviewing role classifications for:
- Tim Southee (Bowler vs All-rounder)
- Pat Cummins (Bowler with a Test century)
- Jofra Archer, Mark Wood (part-time batsmen?)

---

## CORRECTIVE ACTIONS RECOMMENDED

### Immediate (Critical Priority)
1. **Remove duplicate entries**
   - Delete Shakib Al Hasan (ID 53)
   - Delete Mehidy Hasan (ID 54)
   - Delete Trent Boult (ID 62)

2. **Fix hundreds/bestScore mismatches** (11 players)
   For each affected player, either:
   - Set `hundreds = 0` and adjust `fifties` if the best score < 100, OR
   - Increase `bestScore` to ≥ 100 if the century count is correct

3. **Fix Pat Cummins fifties issue**
   - In testStats: fifties should be ≥ 1 (since hundreds = 1)

### High Priority
4. **Resolve bowling average ambiguity**
   - Investigate the data source to understand what the `average` field represents for bowlers
   - If it's NOT bowling average, either fix the values (calculate correctly from runs/wickets) or rename the field to avoid confusion
   - Consider adding separate batting/bowling average fields

5. **Add data dictionary documentation**
   - Define what each stat field means
   - Explain the distinction between "hundreds" and "centuries" (currently redundant)

### Medium Priority
6. **Review role classifications** for borderline all-rounders
7. **Add missing fields** if needed (not outs, balls faced/bowled)
8. **Validate strike rates** once the meaning of the field is clarified

### Lower Priority
9. **Consider expanding the dataset** with more women's cricket players (currently all men)
10. **Add API or utility functions** to validate data integrity automatically

---

## DETAILED ISSUE MATRIX

| Severity | Issue Type | Count | Players Affected |
|----------|------------|-------|------------------|
| Critical | Duplicate entries | 3 | Shakib Al Hasan, Mehidy Hasan, Trent Boult |
| High | Bowling average mismatch | 128 | 40+ bowlers & all-rounders |
| High | Best score < 100 but hundreds > 0 | 11 | Pat Cummins, Ross Taylor, Mitchell Marsh, Alex Carey, Jonny Bairstow, Tamim Iqbal, Shan Masood, Faf du Plessis, Dominic Dragg, Prithvi Shaw |
| Medium | Hundreds > fifties | 1 | Pat Cummins |
| Low | All-rounder with minimal batting | 2 | Ashton Agar, R ashwin |
| Low | Bowler with high batting | 1 | Tim Southee |

---

## CONCLUSION

The dataset requires significant cleanup before it can be considered production-ready. The duplicate entries and best score inconsistencies are straightforward fixes. The bowling average issue is systemic and reflects either a data source problem or a fundamental misunderstanding of how the statistics should be calculated. This must be resolved to maintain data credibility.

**Overall Data Quality Score: 4/10** (Poor, needs major corrections)

Once the critical and high-severity issues are addressed, the dataset could be useful for display purposes, but the ambiguity around average/strikeRate fields will continue to be a concern until clarified.

---

**Report Generated By:** Automated Data Analysis Script
**Files Analyzed:** `C:\PROJECT\cricket-stats\src\data\players.js`
**Total Lines:** ~915
