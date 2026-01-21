interface ComparisonProps {
  title?: string;
  left: {
    title: string;
    items: string[];
    variant?: 'positive' | 'negative' | 'neutral';
  };
  right: {
    title: string;
    items: string[];
    variant?: 'positive' | 'negative' | 'neutral';
  };
}

const variantStyles = {
  positive: {
    bg: 'bg-green-500/5',
    border: 'border-green-500/30',
    header: 'bg-green-500/10 text-green-400',
    bullet: 'text-green-500',
  },
  negative: {
    bg: 'bg-red-500/5',
    border: 'border-red-500/30',
    header: 'bg-red-500/10 text-red-400',
    bullet: 'text-red-500',
  },
  neutral: {
    bg: 'bg-slate-700/30',
    border: 'border-slate-600',
    header: 'bg-slate-700 text-slate-300',
    bullet: 'text-amber-500',
  },
};

export function Comparison({ title, left, right }: ComparisonProps) {
  const leftVariant = left.variant ?? 'neutral';
  const rightVariant = right.variant ?? 'neutral';
  const leftStyles = variantStyles[leftVariant];
  const rightStyles = variantStyles[rightVariant];

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      {title && (
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className={`rounded-lg border-2 overflow-hidden ${leftStyles.border}`}>
          <div className={`${leftStyles.header} px-4 py-3 font-semibold`}>
            {left.title}
          </div>
          <div className={`${leftStyles.bg} p-4`}>
            <ul className="space-y-2">
              {left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${leftStyles.bullet} mt-1`}>•</span>
                  <span className="text-slate-200 text-sm flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className={`rounded-lg border-2 overflow-hidden ${rightStyles.border}`}>
          <div className={`${rightStyles.header} px-4 py-3 font-semibold`}>
            {right.title}
          </div>
          <div className={`${rightStyles.bg} p-4`}>
            <ul className="space-y-2">
              {right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${rightStyles.bullet} mt-1`}>•</span>
                  <span className="text-slate-200 text-sm flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
