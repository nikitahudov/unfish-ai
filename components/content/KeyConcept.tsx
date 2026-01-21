interface KeyConceptProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'formula' | 'warning' | 'tip';
}

const variantStyles = {
  default: {
    icon: '💡',
    borderColor: 'border-amber-500',
    bgColor: 'bg-slate-800/80',
  },
  formula: {
    icon: '📐',
    borderColor: 'border-amber-600',
    bgColor: 'bg-slate-800/80',
  },
  warning: {
    icon: '⚠️',
    borderColor: 'border-amber-500',
    bgColor: 'bg-slate-800/80',
  },
  tip: {
    icon: '💡',
    borderColor: 'border-amber-400',
    bgColor: 'bg-slate-800/80',
  },
};

export function KeyConcept({
  title,
  children,
  variant = 'default'
}: KeyConceptProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        ${styles.bgColor}
        ${styles.borderColor}
        border-l-4
        rounded-lg
        p-6
        my-6
        shadow-lg
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{styles.icon}</span>
        <div className="flex-1">
          {title && (
            <h4 className="text-amber-500 font-semibold text-lg mb-2">
              {title}
            </h4>
          )}
          <div className="text-slate-100 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
