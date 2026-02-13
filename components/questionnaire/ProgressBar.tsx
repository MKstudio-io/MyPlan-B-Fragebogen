'use client'

import { Progress } from '@/components/ui/progress'
import type { StepConfig } from '@/lib/types'

interface ProgressBarProps {
  steps: StepConfig[]
  currentStepIndex: number
}

export function ProgressBar({ steps, currentStepIndex }: ProgressBarProps) {
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Schritt {currentStepIndex + 1} von {steps.length}</span>
        <span className="font-medium text-foreground">{steps[currentStepIndex]?.title}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
