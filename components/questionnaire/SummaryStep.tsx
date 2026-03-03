'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import type { StepConfig, TextareaWithDontKnowValue, CheckboxGroupValue } from '@/lib/types'
import { evaluateCondition } from '@/lib/types'
import { OTHER_PREFIX } from '@/lib/constants'

interface SummaryStepProps {
  steps: StepConfig[]
  answers: Record<string, unknown>
  onEditStep: (stepIndex: number) => void
}

function formatAnswer(type: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return '–'

  switch (type) {
    case 'textarea-with-dontknow': {
      const v = value as TextareaWithDontKnowValue
      if (v.dontKnow) return 'Weiß ich nicht'
      return v.text || '–'
    }
    case 'chips': {
      const arr = value as string[]
      if (arr.length === 0) return '–'
      const formatted = arr.map(item => {
        if (item.startsWith(OTHER_PREFIX)) {
          const text = item.slice(OTHER_PREFIX.length)
          return `Sonstiges: ${text || '–'}`
        }
        return item
      })
      return formatted.join(', ')
    }
    case 'checkbox-group': {
      const v = value as CheckboxGroupValue
      const items = [...(v.selected || [])]
      if (v.otherText) {
        const otherLabel = items.find(s => s === 'Anderes' || s === 'Sonstiges')
        if (otherLabel) {
          const idx = items.indexOf(otherLabel)
          items[idx] = `${otherLabel}: ${v.otherText}`
        }
      }
      return items.length > 0 ? items.join(', ') : '–'
    }
    case 'radio': {
      const str = value as string
      if (str.startsWith(OTHER_PREFIX)) {
        const text = str.slice(OTHER_PREFIX.length)
        return `Sonstiges: ${text || '–'}`
      }
      return str
    }
    case 'gdpr-checkbox':
      return value === true ? 'Zugestimmt' : 'Nicht zugestimmt'
    case 'slider': {
      if (value === undefined || value === null) return '–'
      return String(value)
    }
    default:
      return String(value)
  }
}

export function SummaryStep({ steps, answers, onEditStep }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Zusammenfassung</h2>
        <p className="text-muted-foreground mt-1">
          Bitte überprüfe deine Angaben, bevor du den Fragebogen absendest.
        </p>
      </div>

      {steps.map((step, stepIndex) => (
        <Card key={step.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(stepIndex)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Bearbeiten
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {step.questions.map(question => {
                if (question.condition && !evaluateCondition(question.condition, answers)) {
                  return null
                }
                return (
                  <div key={question.id}>
                    <dt className="text-sm text-muted-foreground">{question.label}</dt>
                    <dd className="text-sm mt-0.5">
                      {formatAnswer(question.type, answers[question.id])}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
