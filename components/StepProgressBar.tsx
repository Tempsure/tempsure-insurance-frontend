'use client';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const MILESTONES = [
  { step: 2, label: 'Vehicle' },
  { step: 3, label: 'Driver' },
  { step: 4, label: 'Licence' },
  { step: 5, label: 'Quote' },
];

export default function StepProgressBar({ currentStep, totalSteps }: StepProgressBarProps) {
  const progressPercentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  const currentMilestone = MILESTONES.find(m => m.step === currentStep);

  return (
    <div className="mb-8 sm:mb-10 animate-form-enter">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600">
            Your quote progress
          </p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
            Step {currentStep} of {totalSteps}
            {currentMilestone && (
              <span className="text-gray-500 font-medium"> · {currentMilestone.label}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm sm:text-base font-bold text-blue-600 tabular-nums">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Track */}
      <div className="relative h-3 sm:h-3.5 rounded-full bg-gray-200/80 overflow-hidden shadow-inner">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progressPercentage}%`,
            background: 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
            boxShadow: '0 0 12px rgba(37, 99, 235, 0.5)',
          }}
        />
        {/* Shimmer */}
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden pointer-events-none"
          style={{ width: `${progressPercentage}%` }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              animation: 'progress-shimmer 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Milestone dots */}
      <div className="relative mt-4 hidden sm:block">
        <div className="flex justify-between px-1">
          {MILESTONES.map((milestone) => {
            const isComplete = currentStep > milestone.step;
            const isCurrent = currentStep === milestone.step;
            return (
              <div key={milestone.step} className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ${
                    isComplete
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                      : isCurrent
                        ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100 scale-110'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isComplete ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{milestone.step}</span>
                  )}
                  {isCurrent && (
                    <span
                      className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"
                      aria-hidden
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold truncate ${
                    isCurrent ? 'text-blue-600' : isComplete ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
