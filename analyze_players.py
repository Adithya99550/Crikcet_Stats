import json
import re

# Read the file
with open('C:/PROJECT/cricket-stats/src/data/players.js', 'r') as f:
    content = f.read()

# Extract array content
match = re.search(r'const players = \[(.*)\];', content, re.DOTALL)
if not match:
    print("Could not find players array")
    exit(1)

# Parse the objects manually
players_text = match.group(1)

# Split by '},' but be careful with nested objects
player_strings = []
brace_count = 0
start = 0
for i, char in enumerate(players_text):
    if char == '{':
        if brace_count == 0:
            start = i
        brace_count += 1
    elif char == '}':
        brace_count -= 1
        if brace_count == 0:
            player_strings.append(players_text[start:i+1])

print(f"Found {len(player_strings)} players")

def parse_player(p_str):
    """Parse a player object string into a dict"""
    # Replace JS syntax with Python
    p_str = p_str.replace('null', 'None')
    # Extract fields using regex
    data = {}

    # id
    id_match = re.search(r'id:\s*(\d+)', p_str)
    if id_match:
        data['id'] = int(id_match.group(1))

    # name
    name_match = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', p_str)
    if name_match:
        data['name'] = name_match.group(1)
    else:
        name_match = re.search(r'name:\s*([^\s,{][^,{]*)', p_str)
        if name_match:
            data['name'] = name_match.group(1).strip()

    # country
    country_match = re.search(r'country:\s*[\'"]([^\'"]+)[\'"]', p_str)
    if country_match:
        data['country'] = country_match.group(1)
    else:
        country_match = re.search(r'country:\s*([^\s,{][^,{]*)', p_str)
        if country_match:
            data['country'] = country_match.group(1).strip()

    # role
    role_match = re.search(r'role:\s*[\'"]([^\'"]+)[\'"]', p_str)
    if role_match:
        data['role'] = role_match.group(1)
    else:
        role_match = re.search(r'role:\s*([^\s,{][^,{]*)', p_str)
        if role_match:
            data['role'] = role_match.group(1).strip()

    # careerStatus
    status_match = re.search(r'careerStatus:\s*[\'"](\w+)[\'"]', p_str)
    if status_match:
        data['careerStatus'] = status_match.group(1)

    # Parse stats
    for stat_type in ['testStats', 'odiStats', 't20iStats']:
        pattern = rf'{stat_type}\s*:\s*\{{([^}}]+)\}}'
        stats_match = re.search(pattern, p_str, re.DOTALL)
        if stats_match:
            stats_text = stats_match.group(1)
            stats = {}
            for field in ['matches', 'innings', 'runs', 'wickets', 'average', 'strikeRate', 'hundreds', 'fifties', 'bestScore', 'catches', 'centuries', 'fiveWickets']:
                field_match = re.search(rf'{field}\s*:\s*([\d.]+)', stats_text)
                if field_match:
                    val = field_match.group(1)
                    if '.' in val:
                        stats[field] = float(val)
                    else:
                        stats[field] = int(val)
                else:
                    stats[field] = 0
            data[stat_type] = stats

    return data

players = [parse_player(p) for p in player_strings]

# Now analyze for issues
issues = []

for i, p in enumerate(players, 1):
    player_name = p.get('name', f'Player {i}')
    role = p.get('role', '').lower()
    career_status = p.get('careerStatus', '')

    for stat_type in ['testStats', 'odiStats', 't20iStats']:
        stats = p.get(stat_type, {})
        if not stats:
            continue

        matches = stats.get('matches', 0)
        innings = stats.get('innings', 0)
        runs = stats.get('runs', 0)
        wickets = stats.get('wickets', 0)
        average = stats.get('average', 0)
        strike_rate = stats.get('strikeRate', 0)
        hundreds = stats.get('hundreds', 0)
        fifties = stats.get('fifties', 0)
        centuries = stats.get('centuries', 0)
        best_score = stats.get('bestScore', 0)
        catches = stats.get('catches', 0)
        five_wickets = stats.get('fiveWickets', 0)

        # 1. Check for negative values
        if runs < 0:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'runs',
                'value': runs,
                'issue': 'Negative runs value',
                'severity': 'critical'
            })
        if wickets < 0:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'wickets',
                'value': wickets,
                'issue': 'Negative wickets value',
                'severity': 'critical'
            })
        if average < 0:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'average',
                'value': average,
                'issue': 'Negative average value',
                'severity': 'critical'
            })
        if strike_rate < 0:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'strikeRate',
                'value': strike_rate,
                'issue': 'Negative strike rate value',
                'severity': 'critical'
            })

        # 2. Check for impossibly high values
        if strike_rate > 300:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'strikeRate',
                'value': strike_rate,
                'issue': f'Strike rate {strike_rate} exceeds 300, unrealistic',
                'severity': 'high'
            })

        # For batting averages > 200 (possible but rare for long careers)
        if 'batter' in role or 'wicket' in role or role == 'all-rounder':
            if average > 100 and innings > 20:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'average',
                    'value': average,
                    'issue': f'Batting average {average} is extremely high for {innings} innings',
                    'severity': 'medium'
                })

        # 3. Check consistency: hundreds/fifties vs innings
        if hundreds > innings:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'hundreds',
                'value': hundreds,
                'issue': f'Hundreds ({hundreds}) cannot exceed innings ({innings})',
                'severity': 'critical'
            })
        if fifties > innings:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'fifties',
                'value': fifties,
                'issue': f'Fifties ({fifties}) cannot exceed innings ({innings})',
                'severity': 'critical'
            })
        if hundreds > fifties:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'hundreds/fifties relationship',
                'value': f'{hundreds} hundreds, {fifties} fifties',
                'issue': f'Hundreds ({hundreds}) cannot exceed fifties ({fifties}) - every century is also a fifty',
                'severity': 'medium'
            })
        if hundreds + fifties > innings and innings > 0:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'hundreds and fifties sum',
                'value': hundreds + fifties,
                'issue': f'Total hundreds+fifties ({hundreds + fifties}) exceeds innings ({innings}) - check for duplicate counting',
                'severity': 'medium'
            })

        # 4. Check average consistency
        if innings > 0 and average > 0 and wickets == 0:  # Batsman/WK keeper
            expected_avg = runs / innings
            # Allow some tolerance due to not outs (average can be higher than runs/innings)
            if average < expected_avg * 0.7:  # Average significantly lower than runs/innings
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'average',
                    'value': average,
                    'issue': f'Batting average ({average}) is much lower than runs/innings ({expected_avg:.2f}) - may be incorrect',
                    'severity': 'high'
                })
        if wickets > 0 and average > 0:
            expected_bowl_avg = runs / wickets
            # Allow some tolerance
            if abs(average - expected_bowl_avg) > max(5, expected_bowl_avg * 0.5):
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'average',
                    'value': average,
                    'issue': f'Bowling average ({average}) does not match runs/wickets ({expected_bowl_avg:.2f}) - potential calculation error',
                    'severity': 'high'
                })

        # 5. Check for missing or zero values when matches > 0
        if matches > 0 and runs == 0 and 'bowler' not in role:
            issues.append({
                'player': player_name,
                'format': stat_type,
                'field': 'runs',
                'value': runs,
                'issue': f'Player has {matches} matches but 0 runs - suspicious for a {role}',
                'severity': 'medium'
            })

        # 6. Check best batting score consistency
        if best_score > 0 and hundreds > 0:
            max_possible_hundreds = innings if 'all' in role else min(innings, 100)
            # Check if best score is consistent with having hundreds - should be at least 100 if has hundreds
            if best_score < 100 and hundreds > 0:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'bestScore',
                    'value': best_score,
                    'issue': f'Player has {hundreds} hundreds but best score is only {best_score}',
                    'severity': 'high'
                })

        # 7. Check role-specific consistency
        if 'bowler' in role:
            # Bowlers should have wickets > runs typically
            if runs > wickets * 5 and wickets > 0:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'runs/wickets ratio',
                    'value': f'{runs} runs, {wickets} wickets',
                    'issue': f'Bowler has many more runs ({runs}) than wickets ({wickets}) - could be wrong role',
                    'severity': 'low'
                })
            if hundreds > 0 or fifties > innings * 0.3:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'batting stats',
                    'value': f'{hundreds} hundreds, {fifties} fifties',
                    'issue': f'Bowler has unusually high batting achievements (hundreds/fifties)',
                    'severity': 'low'
                })
        elif 'batter' in role or 'keeper' in role:
            # Batters should have runs > wickets significantly
            if wickets > runs * 0.1 and wickets > 5:  # Flexible threshold
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'wickets',
                    'value': wickets,
                    'issue': f'Batter/WK has {wickets} wickets which is high for the role (runs: {runs})',
                    'severity': 'low'
                })
        elif 'all-rounder' in role:
            # All-rounders should have decent contributions in both
            if wickets == 0 and matches > 10:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'wickets',
                    'value': wickets,
                    'issue': f'All-rounder has 0 wickets in {stat_type} with {matches} matches',
                    'severity': 'medium'
                })
            if runs < 500 and matches > 20 and wickets > 0:
                issues.append({
                    'player': player_name,
                    'format': stat_type,
                    'field': 'runs',
                    'value': runs,
                    'issue': f'All-rounder has only {runs} runs in {matches} matches - batting contribution minimal',
                    'severity': 'low'
                })

# Check for duplicate players
player_names = [p['name'] for p in players]
duplicate_names = {}
for i, name in enumerate(player_names):
    if name in duplicate_names:
        duplicate_names[name].append(i+1)
    else:
        duplicate_names[name] = [i+1]

for name, indices in duplicate_names.items():
    if len(indices) > 1:
        issues.append({
            'player': name,
            'format': 'ALL',
            'field': 'duplicate',
            'value': indices,
            'issue': f'Duplicate player entry found at positions {indices}',
            'severity': 'critical'
        })

# Check for duplicate field issue (hundreds vs centuries)
for p in players:
    for stat_type in ['testStats', 'odiStats', 't20iStats']:
        stats = p.get(stat_type, {})
        if stats:
            h = stats.get('hundreds', 0)
            c = stats.get('centuries', 0)
            if h != c:
                issues.append({
                    'player': p['name'],
                    'format': stat_type,
                    'field': 'hundreds/centuries mismatch',
                    'value': f'hundreds={h}, centuries={c}',
                    'issue': 'hundreds and centuries fields should be identical but differ',
                    'severity': 'medium'
                })

# Sort issues by severity and player
severity_order = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}
issues_sorted = sorted(issues, key=lambda x: (severity_order.get(x['severity'], 4), x['player']))

print("\n" + "="*100)
print(f"DATA ACCURACY ANALYSIS REPORT")
print(f"Total players: {len(players)}")
print(f"Total issues found: {len(issues_sorted)}")
print("="*100)

current_severity = None
for issue in issues_sorted:
    if issue['severity'] != current_severity:
        current_severity = issue['severity']
        print(f"\n>>> {current_severity.upper()} SEVERITY ISSUES:")
    print(f"\nPlayer: {issue['player']}")
    print(f"  Format: {issue['format']}")
    print(f"  Field: {issue['field']}")
    print(f"  Value: {issue['value']}")
    print(f"  Issue: {issue['issue']}")

# Summary statistics
print("\n" + "="*100)
print("SUMMARY BY SEVERITY:")
from collections import Counter
severity_counts = Counter([i['severity'] for i in issues_sorted])
for sev in ['critical', 'high', 'medium', 'low']:
    print(f"  {sev}: {severity_counts.get(sev, 0)}")

print("\nISSUES BY CATEGORY:")
issue_types = Counter([i['field'] for i in issues_sorted])
for field, count in issue_types.most_common():
    print(f"  {field}: {count}")

print("\n" + "="*100)
