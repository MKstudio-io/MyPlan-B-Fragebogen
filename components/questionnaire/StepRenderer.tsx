'use client'

import type { StepConfig } from '@/lib/types'
import { evaluateCondition } from '@/lib/types'
import { FieldRenderer } from './FieldRenderer'

interface StepRendererProps {
  step: StepConfig
  answers: Record<string, unknown>
  errors: Record<string, string>
  onChange: (fieldId: string, value: unknown) => void
}

export function StepRenderer({ step, answers, errors, onChange }: StepRendererProps) {
  return (
    <div className="space-y-6">
      {step.description && (
        <p className="text-muted-foreground">{step.description}</p>
      )}
      {step.questions.map(question => {
        if (question.condition && !evaluateCondition(question.condition, answers)) {
          return null
        }
        return (
          <FieldRenderer
            key={question.id}
            config={question}
            value={answers[question.id]}
            error={errors[question.id]}
            onChange={(value) => onChange(question.id, value)}
          />
        )
      })}
    </div>
  )
}
