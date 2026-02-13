'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface ChipsFieldProps {
  config: QuestionConfig
  value: string[]
  error?: string
  onChange: (value: string[]) => void
}

export function ChipsField({ config, value, error, onChange }: ChipsFieldProps) {
  const selected = value || []

  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="space-y-2">
      <Label>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="flex flex-wrap gap-2">
        {(config.options || []).map(option => (
          <Button
            key={option}
            type="button"
            variant={selected.includes(option) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggle(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
