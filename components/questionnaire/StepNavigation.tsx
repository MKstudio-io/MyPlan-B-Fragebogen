'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  isLastStep: boolean
  isSubmitting: boolean
  backLabel: string
  nextLabel: string
  submitLabel: string
  onBack: () => void
  onNext: () => void
}

export function StepNavigation({
  currentStep,
  totalSteps,
  isLastStep,
  isSubmitting,
  backLabel,
  nextLabel,
  submitLabel,
  onBack,
  onNext,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 0 ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {backLabel}
        </Button>
      ) : (
        <div />
      )}

      <Button
        type="button"
        variant={isLastStep ? 'accent' : 'default'}
        size={isLastStep ? 'lg' : 'default'}
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Wird gesendet...
          </>
        ) : isLastStep ? (
          <>
            <Send className="mr-2 h-4 w-4" />
            {submitLabel}
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
