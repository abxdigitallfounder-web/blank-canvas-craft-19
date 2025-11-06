export const GenderDistributionChart = () => {
  return (
    <div className="flex items-center justify-center gap-8 h-full">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">Homens</div>
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#3B82F6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${188 * 0.5} ${188 * 0.5}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-semibold text-primary">50%</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Total: 1</div>
      </div>

      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">Mulheres</div>
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#A855F7"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${188 * 0.5} ${188 * 0.5}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-semibold text-purple-500">50%</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">Total: 1</div>
      </div>
    </div>
  );
};
