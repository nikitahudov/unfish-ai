'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { skillsData, type Skill, type SkillCategory } from '@/data/skills';
import { SkillModal } from './SkillModal';

interface SkillsWheelProps {
  onSkillSelect?: (skill: Skill, category: string) => void;
}

const getLevelColor = (level: string): string => {
  switch (level) {
    case 'Fundamental':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'Intermediate':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Advanced':
      return 'bg-rose-500/20 text-rose-400';
    default:
      return 'bg-slate-500/20 text-slate-400';
  }
};

const getLevelDotColor = (level: string): string => {
  switch (level) {
    case 'Fundamental':
      return 'bg-emerald-500';
    case 'Intermediate':
      return 'bg-yellow-500';
    case 'Advanced':
      return 'bg-rose-500';
    default:
      return 'bg-slate-500';
  }
};

export const SkillsWheel: React.FC<SkillsWheelProps> = ({ onSkillSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  const categories = Object.keys(skillsData);
  const totalCategories = categories.length;

  // Calculate total skills
  const totalSkills = Object.values(skillsData).reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Interactive Wheel and Detail Panel */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Wheel Section */}
        <div className="lg:w-1/2">
          <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              🎯 96-Skill Framework
            </h2>

            {/* SVG Wheel */}
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {categories.map((category, index) => {
                  const angle = (index * 360) / totalCategories;
                  const nextAngle = ((index + 1) * 360) / totalCategories;
                  const midAngle = (angle + nextAngle) / 2;

                  const startRad = (angle - 90) * (Math.PI / 180);
                  const endRad = (nextAngle - 90) * (Math.PI / 180);
                  const midRad = (midAngle - 90) * (Math.PI / 180);

                  const innerRadius = 80;
                  const outerRadius = 180;
                  const iconRadius = 130;

                  const x1 = 200 + innerRadius * Math.cos(startRad);
                  const y1 = 200 + innerRadius * Math.sin(startRad);
                  const x2 = 200 + outerRadius * Math.cos(startRad);
                  const y2 = 200 + outerRadius * Math.sin(startRad);
                  const x3 = 200 + outerRadius * Math.cos(endRad);
                  const y3 = 200 + outerRadius * Math.sin(endRad);
                  const x4 = 200 + innerRadius * Math.cos(endRad);
                  const y4 = 200 + innerRadius * Math.sin(endRad);

                  const iconX = 200 + iconRadius * Math.cos(midRad);
                  const iconY = 200 + iconRadius * Math.sin(midRad);

                  const largeArc = nextAngle - angle > 180 ? 1 : 0;

                  const isSelected = selectedCategory === category;
                  const isHovered = hoveredCategory === category;

                  return (
                    <g key={category}>
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`}
                        fill={skillsData[category].color}
                        opacity={isSelected ? 1 : isHovered ? 0.8 : 0.6}
                        stroke={isSelected ? '#fff' : 'rgba(0,0,0,0.3)'}
                        strokeWidth={isSelected ? 3 : 1}
                        className="cursor-pointer transition-all duration-200"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedSkillIndex(null);
                        }}
                        onMouseEnter={() => setHoveredCategory(category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      />
                      <text
                        x={iconX}
                        y={iconY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-2xl pointer-events-none select-none"
                        style={{ fontSize: '24px' }}
                      >
                        {skillsData[category].icon}
                      </text>
                    </g>
                  );
                })}

                {/* Center Circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="75"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="2"
                />
                <text
                  x="200"
                  y="190"
                  textAnchor="middle"
                  className="fill-white font-bold"
                  style={{ fontSize: '24px' }}
                >
                  {totalSkills}
                </text>
                <text
                  x="200"
                  y="215"
                  textAnchor="middle"
                  className="fill-slate-400"
                  style={{ fontSize: '12px' }}
                >
                  Total Skills
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-slate-400">Fundamental</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-slate-400">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="text-slate-400">Advanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Detail Panel */}
        <div className="lg:w-1/2">
          <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur border border-slate-700/50 h-full min-h-[400px]">
            {selectedCategory ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-3xl p-2 rounded-lg"
                    style={{ backgroundColor: skillsData[selectedCategory].color }}
                  >
                    {skillsData[selectedCategory].icon}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedCategory}</h2>
                    <p className="text-slate-400 text-sm">
                      {skillsData[selectedCategory].skills.length} skills
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 max-h-80 overflow-y-auto pr-2">
                  {skillsData[selectedCategory].skills.map((skill, idx) => (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillClick(skill)}
                      className="w-full text-left p-3 rounded-lg transition-all bg-slate-700/50 hover:bg-slate-700"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-500">
                              {skill.id}
                            </span>
                            <span className="font-medium text-white text-sm">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getLevelColor(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4 opacity-50">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a Category</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Click any skill category on the wheel to explore the individual skills
                  and their descriptions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Skills Reference Grid */}
      <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">📋 Complete Skills Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category} className="bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-lg p-1.5 rounded"
                  style={{ backgroundColor: skillsData[category].color }}
                >
                  {skillsData[category].icon}
                </span>
                <h3 className="font-semibold text-white text-sm">{category}</h3>
              </div>
              <ul className="space-y-1">
                {skillsData[category].skills.map((skill) => (
                  <li key={skill.id} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${getLevelDotColor(skill.level)}`}></span>
                    <button
                      onClick={() => handleSkillClick(skill)}
                      className="text-slate-300 text-xs hover:text-amber-400 transition-colors text-left"
                    >
                      {skill.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
          <div className="text-2xl font-bold text-amber-500">{totalCategories}</div>
          <div className="text-slate-400 text-sm">Categories</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
          <div className="text-2xl font-bold text-emerald-500">
            {Object.values(skillsData).reduce(
              (sum, cat) => sum + cat.skills.filter((s) => s.level === 'Fundamental').length,
              0
            )}
          </div>
          <div className="text-slate-400 text-sm">Fundamental</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
          <div className="text-2xl font-bold text-yellow-500">
            {Object.values(skillsData).reduce(
              (sum, cat) => sum + cat.skills.filter((s) => s.level === 'Intermediate').length,
              0
            )}
          </div>
          <div className="text-slate-400 text-sm">Intermediate</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
          <div className="text-2xl font-bold text-rose-500">
            {Object.values(skillsData).reduce(
              (sum, cat) => sum + cat.skills.filter((s) => s.level === 'Advanced').length,
              0
            )}
          </div>
          <div className="text-slate-400 text-sm">Advanced</div>
        </div>
      </div>

      {/* Skill Modal - Only mount when needed to avoid SSR hydration issues */}
      {isModalOpen && (
        <SkillModal
          skill={selectedSkill}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SkillsWheel;
