#!/bin/bash

# ============================================
# UNFISH.AI - DEPLOYMENT SCRIPT
# Run this on your DigitalOcean server
# ============================================

set -e  # Exit on error

echo "🦈 UnFish.ai - Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "   Please run this script from your Next.js project directory:"
    echo "   cd ~/projects/unfish-ai"
    exit 1
fi

echo "📁 Creating directory structure..."

# Create directories
mkdir -p app/wiki
mkdir -p app/assess
mkdir -p app/coach
mkdir -p app/progress
mkdir -p components/layout
mkdir -p components/wiki
mkdir -p components/quiz
mkdir -p data/phase1-fundamentals
mkdir -p data/phase2-intermediate
mkdir -p data/phase3-advanced
mkdir -p lib
mkdir -p types
mkdir -p hooks

echo "✅ Directories created"
echo ""
echo "📝 Creating files..."

# ============================================
# DATA/SKILLS.TS
# ============================================
cat > data/skills.ts << 'SKILLS_EOF'
// ============================================
// POKER SKILLS DATA
// Complete 96-skill curriculum data
// ============================================

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: 'Fundamental' | 'Intermediate' | 'Advanced';
  module: number;
  hasQuiz?: boolean;
  hasContent?: boolean;
}

export interface SkillCategory {
  color: string;
  icon: string;
  id: string;
  skills: Skill[];
}

export type SkillsData = Record<string, SkillCategory>;

export const skillsData: SkillsData = {
  "Mathematical Foundations": {
    color: "#3B82F6",
    icon: "📐",
    id: "math",
    skills: [
      { id: "1.1", name: "Pot Odds", description: "Calculate the ratio of current pot to cost of call", level: "Fundamental", module: 1, hasQuiz: true, hasContent: true },
      { id: "1.2", name: "Equity Calculation", description: "Determine your hand's winning percentage vs ranges", level: "Fundamental", module: 1, hasQuiz: true, hasContent: true },
      { id: "11.1", name: "Implied Odds", description: "Factor in future bets when calculating odds", level: "Intermediate", module: 11 },
      { id: "11.2", name: "Expected Value (EV)", description: "Calculate the long-term profitability of decisions", level: "Intermediate", module: 11 },
      { id: "11.3", name: "Fold Equity", description: "Value of forcing opponents to fold", level: "Intermediate", module: 11 },
      { id: "11.4", name: "Risk of Ruin", description: "Bankroll mathematics and variance management", level: "Intermediate", module: 11 },
      { id: "23.1", name: "Combinatorics", description: "Count hand combinations in opponent ranges", level: "Advanced", module: 23 },
      { id: "23.2", name: "ICM (Tournament)", description: "Independent Chip Model for tournament equity", level: "Advanced", module: 23 }
    ]
  },
  "Pre-Flop Strategy": {
    color: "#10B981",
    icon: "🎯",
    id: "preflop",
    skills: [
      { id: "2.1", name: "Starting Hand Selection", description: "Know which hands to play from each position", level: "Fundamental", module: 2, hasQuiz: true, hasContent: true },
      { id: "2.2", name: "Position Awareness", description: "Adjust ranges based on table position", level: "Fundamental", module: 2, hasQuiz: true, hasContent: true },
      { id: "2.3", name: "Open Raising Ranges", description: "Optimal RFI (Raise First In) strategies", level: "Fundamental", module: 2, hasQuiz: true, hasContent: true },
      { id: "12.1", name: "3-Betting Strategy", description: "When and how to re-raise pre-flop", level: "Intermediate", module: 12 },
      { id: "12.2", name: "Blind Defense", description: "Defending big blind and small blind", level: "Intermediate", module: 12 },
      { id: "12.3", name: "Limping Strategy", description: "When limping can be strategically correct", level: "Intermediate", module: 12 },
      { id: "24.1", name: "4-Bet/5-Bet Dynamics", description: "Navigate escalating pre-flop aggression", level: "Advanced", module: 24 },
      { id: "24.2", name: "Squeeze Plays", description: "Re-raising after a raise and call", level: "Advanced", module: 24 }
    ]
  },
  "Post-Flop Play": {
    color: "#F59E0B",
    icon: "🃏",
    id: "postflop",
    skills: [
      { id: "3.1", name: "Continuation Betting", description: "C-bet sizing, frequency, and board texture", level: "Fundamental", module: 3, hasQuiz: true },
      { id: "3.2", name: "Value Betting", description: "Extracting maximum value from strong hands", level: "Fundamental", module: 3, hasQuiz: true },
      { id: "13.1", name: "Check-Raising", description: "Building pots and protecting ranges", level: "Intermediate", module: 13 },
      { id: "13.2", name: "Floating", description: "Calling with intent to take pot away later", level: "Intermediate", module: 13 },
      { id: "13.3", name: "Probe Betting", description: "Betting when checked to out of position", level: "Intermediate", module: 13 },
      { id: "13.4", name: "Pot Control", description: "Managing pot size with medium-strength hands", level: "Intermediate", module: 13 },
      { id: "25.1", name: "Donk Betting", description: "Leading into the pre-flop aggressor", level: "Advanced", module: 25 },
      { id: "25.2", name: "Multi-Street Planning", description: "Planning turn and river actions on flop", level: "Advanced", module: 25 }
    ]
  },
  "Range Construction": {
    color: "#8B5CF6",
    icon: "📊",
    id: "ranges",
    skills: [
      { id: "14.1", name: "Range Building", description: "Construct balanced pre-flop ranges", level: "Intermediate", module: 14 },
      { id: "14.2", name: "Polarization", description: "Betting with value hands and bluffs only", level: "Intermediate", module: 14 },
      { id: "14.3", name: "Linear Ranges", description: "Betting a continuous range of hand strength", level: "Intermediate", module: 14 },
      { id: "26.1", name: "Range vs Range Thinking", description: "Analyze situations as range battles", level: "Advanced", module: 26 },
      { id: "26.2", name: "Range Advantage", description: "Identify who has stronger range on board", level: "Advanced", module: 26 },
      { id: "26.3", name: "Nut Advantage", description: "Recognize who can have the strongest hands", level: "Advanced", module: 26 },
      { id: "26.4", name: "Capped Ranges", description: "Exploit when opponent's range is limited", level: "Advanced", module: 26 },
      { id: "26.5", name: "Range Merging", description: "Turning hands into bluff-catchers or thin value", level: "Advanced", module: 26 }
    ]
  },
  "Bluffing & Deception": {
    color: "#EF4444",
    icon: "🎭",
    id: "bluffing",
    skills: [
      { id: "4.1", name: "Semi-Bluffing", description: "Bluffing with hands that can improve", level: "Fundamental", module: 4, hasQuiz: true },
      { id: "15.1", name: "Pure Bluffing", description: "Bluffing with no equity when called", level: "Intermediate", module: 15 },
      { id: "15.2", name: "Slow Playing", description: "Underrepresenting strong hands", level: "Intermediate", module: 15 },
      { id: "15.3", name: "Timing Tells", description: "Use bet timing for deception", level: "Intermediate", module: 15 },
      { id: "27.1", name: "Blocker Theory", description: "Use card removal to inform bluffs", level: "Advanced", module: 27 },
      { id: "27.2", name: "Triple Barrel Bluffing", description: "Sustained aggression across all streets", level: "Advanced", module: 27 },
      { id: "27.3", name: "Overbetting", description: "Large bets for polarized strategies", level: "Advanced", module: 27 },
      { id: "27.4", name: "Balanced Bluffing", description: "Maintain unexploitable bluff frequencies", level: "Advanced", module: 27 }
    ]
  },
  "Hand Reading": {
    color: "#EC4899",
    icon: "🔍",
    id: "handreading",
    skills: [
      { id: "5.1", name: "Board Texture Analysis", description: "How boards interact with ranges", level: "Fundamental", module: 5, hasQuiz: true },
      { id: "5.2", name: "Showdown Analysis", description: "Learn from revealed hands", level: "Fundamental", module: 5 },
      { id: "16.1", name: "Range Narrowing", description: "Eliminate hands from opponent's range each street", level: "Intermediate", module: 16 },
      { id: "16.2", name: "Betting Pattern Recognition", description: "What sizing and actions reveal", level: "Intermediate", module: 16 },
      { id: "16.3", name: "Physical Tell Reading", description: "Interpret body language and behavior", level: "Intermediate", module: 16 },
      { id: "16.4", name: "Timing Tell Recognition", description: "Information from decision speed", level: "Intermediate", module: 16 },
      { id: "16.5", name: "Population Tendencies", description: "Default assumptions for unknown players", level: "Intermediate", module: 16 },
      { id: "28.1", name: "Reverse Hand Reading", description: "Consider what opponent thinks you have", level: "Advanced", module: 28 }
    ]
  },
  "Game Theory": {
    color: "#06B6D4",
    icon: "🧠",
    id: "gametheory",
    skills: [
      { id: "17.1", name: "GTO Fundamentals", description: "Game Theory Optimal baseline strategies", level: "Intermediate", module: 17 },
      { id: "17.2", name: "Solver Usage", description: "Effectively study with GTO software", level: "Intermediate", module: 17 },
      { id: "29.1", name: "Exploitation", description: "Deviate from GTO to punish mistakes", level: "Advanced", module: 29 },
      { id: "29.2", name: "Mixed Strategies", description: "Randomizing decisions at correct frequencies", level: "Advanced", module: 29 },
      { id: "29.3", name: "Indifference Principle", description: "Making opponent indifferent between options", level: "Advanced", module: 29 },
      { id: "29.4", name: "Nash Equilibrium", description: "Unexploitable strategy concepts", level: "Advanced", module: 29 },
      { id: "29.5", name: "Node Locking", description: "Analyze exploitative adjustments in solvers", level: "Advanced", module: 29 },
      { id: "29.6", name: "Simplification", description: "Apply GTO concepts in real-time play", level: "Advanced", module: 29 }
    ]
  },
  "Mental Game": {
    color: "#84CC16",
    icon: "🧘",
    id: "mentalgame",
    skills: [
      { id: "6.1", name: "Tilt Control", description: "Manage emotions after bad beats", level: "Fundamental", module: 6, hasQuiz: true },
      { id: "6.2", name: "Focus & Concentration", description: "Maintain attention during long sessions", level: "Fundamental", module: 6 },
      { id: "6.3", name: "Motivation & Discipline", description: "Consistent study and play habits", level: "Fundamental", module: 6 },
      { id: "6.4", name: "Growth Mindset", description: "Embrace learning from mistakes", level: "Fundamental", module: 6 },
      { id: "18.1", name: "Confidence Management", description: "Handle winning and losing streaks", level: "Intermediate", module: 18 },
      { id: "18.2", name: "Stress Management", description: "Perform under pressure in big pots", level: "Intermediate", module: 18 },
      { id: "18.3", name: "Fear Management", description: "Overcome fear of losing or making mistakes", level: "Intermediate", module: 18 },
      { id: "18.4", name: "Mindfulness", description: "Stay present and aware at the table", level: "Intermediate", module: 18 }
    ]
  },
  "Table Dynamics": {
    color: "#F97316",
    icon: "👥",
    id: "tabledynamics",
    skills: [
      { id: "7.1", name: "Player Profiling", description: "Categorize opponents by playing style", level: "Fundamental", module: 7, hasQuiz: true },
      { id: "7.2", name: "Table Selection", description: "Choose profitable games and seats", level: "Fundamental", module: 7 },
      { id: "19.1", name: "Seat Selection", description: "Position yourself relative to player types", level: "Intermediate", module: 19 },
      { id: "19.2", name: "Stack Size Adjustments", description: "Adapt to effective stack depths", level: "Intermediate", module: 19 },
      { id: "19.3", name: "Multiway Pot Strategy", description: "Adjustments for 3+ players", level: "Intermediate", module: 19 },
      { id: "19.4", name: "Short-Handed Adjustments", description: "Strategy for 6-max and heads-up", level: "Intermediate", module: 19 },
      { id: "30.1", name: "Table Image", description: "Leverage your perceived playing style", level: "Advanced", module: 30 },
      { id: "30.2", name: "Meta-Game", description: "Long-term dynamics with regular opponents", level: "Advanced", module: 30 }
    ]
  },
  "Bankroll & Career": {
    color: "#6366F1",
    icon: "💼",
    id: "bankroll",
    skills: [
      { id: "8.1", name: "Bankroll Management", description: "Proper stake selection for your roll", level: "Fundamental", module: 8, hasQuiz: true },
      { id: "8.2", name: "Game Selection", description: "Choose the most profitable formats", level: "Fundamental", module: 8 },
      { id: "8.3", name: "Record Keeping", description: "Track results and analyze performance", level: "Fundamental", module: 8 },
      { id: "20.1", name: "Moving Up Stakes", description: "When and how to take shots", level: "Intermediate", module: 20 },
      { id: "20.2", name: "Poker as Income", description: "Manage poker as a business", level: "Intermediate", module: 20 },
      { id: "20.3", name: "Tax Considerations", description: "Understand poker tax obligations", level: "Intermediate", module: 20 },
      { id: "31.1", name: "Sponsorship & Branding", description: "Build your poker brand", level: "Advanced", module: 31 },
      { id: "31.2", name: "Coaching Others", description: "Teach poker effectively", level: "Advanced", module: 31 }
    ]
  },
  "Study & Improvement": {
    color: "#A855F7",
    icon: "📚",
    id: "study",
    skills: [
      { id: "9.1", name: "Hand History Review", description: "Analyze your played hands effectively", level: "Fundamental", module: 9, hasQuiz: true },
      { id: "9.2", name: "Using Training Sites", description: "Get value from poker education", level: "Fundamental", module: 9 },
      { id: "21.1", name: "Database Analysis", description: "Use HUD stats and filters effectively", level: "Intermediate", module: 21 },
      { id: "21.2", name: "Study Group Participation", description: "Learn collaboratively with peers", level: "Intermediate", module: 21 },
      { id: "21.3", name: "Leak Finding", description: "Identify and fix weaknesses", level: "Intermediate", module: 21 },
      { id: "32.1", name: "Advanced Solver Work", description: "Deep dive into GTO solutions", level: "Advanced", module: 32 },
      { id: "32.2", name: "Creating Study Plans", description: "Structure long-term improvement", level: "Advanced", module: 32 },
      { id: "32.3", name: "Theory Development", description: "Develop original strategic insights", level: "Advanced", module: 32 }
    ]
  },
  "Format-Specific Skills": {
    color: "#14B8A6",
    icon: "🎰",
    id: "formats",
    skills: [
      { id: "10.1", name: "Cash Game Fundamentals", description: "Core cash game strategy", level: "Fundamental", module: 10, hasQuiz: true },
      { id: "10.2", name: "Tournament Basics", description: "Core tournament strategy", level: "Fundamental", module: 10 },
      { id: "22.1", name: "MTT Middle Stages", description: "Navigate tournament middle stages", level: "Intermediate", module: 22 },
      { id: "22.2", name: "Final Table Play", description: "Adjust for final table dynamics", level: "Intermediate", module: 22 },
      { id: "22.3", name: "Sit & Go Strategy", description: "SNG-specific adjustments", level: "Intermediate", module: 22 },
      { id: "33.1", name: "High Stakes Adjustments", description: "Compete at highest levels", level: "Advanced", module: 33 },
      { id: "33.2", name: "Live vs Online Differences", description: "Adapt between formats", level: "Advanced", module: 33 },
      { id: "33.3", name: "Heads-Up Mastery", description: "Specialized heads-up strategy", level: "Advanced", module: 33 }
    ]
  }
};

// Helper functions
export const getAllSkills = (): Skill[] => {
  return Object.values(skillsData).flatMap(category => category.skills);
};

export const getSkillById = (id: string): Skill | undefined => {
  return getAllSkills().find(skill => skill.id === id);
};

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return getAllSkills().filter(skill => skill.level === level);
};

export const getCategoryBySkillId = (skillId: string): string | undefined => {
  for (const [categoryName, category] of Object.entries(skillsData)) {
    if (category.skills.some(skill => skill.id === skillId)) {
      return categoryName;
    }
  }
  return undefined;
};

export const getSkillCount = () => {
  const all = getAllSkills();
  return {
    total: all.length,
    fundamental: all.filter(s => s.level === 'Fundamental').length,
    intermediate: all.filter(s => s.level === 'Intermediate').length,
    advanced: all.filter(s => s.level === 'Advanced').length,
  };
};
SKILLS_EOF

echo "  ✅ data/skills.ts"

# Continue in next message due to length...
echo ""
echo "🎉 Skills data created!"
echo ""
echo "⚠️  This script is too long to include all files."
echo "    Please continue with the individual file creation commands below."
echo ""
echo "=============================================="
echo "Run these commands to complete the setup:"
echo "=============================================="
