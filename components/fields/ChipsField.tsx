'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'
import { OTHER_PREFIX } from '@/lib/constants'

interface ChipsFieldProps {
  config: QuestionConfig
  value: string[]
  error?: string
  onChange: (value: string[]) => void
}

export function ChipsField({ config, value, error, onChange }: ChipsFieldProps) {
  const selected = value || []

  // Extract other text from the array (stored as __other__:text)
  const otherEntry = selected.find(s => s.startsWith(OTHER_PREFIX))
  const otherText = otherEntry ? otherEntry.slice(OTHER_PREFIX.length) : ''
  const isOtherSelected = !!otherEntry

  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  const handleOtherToggle = () => {
    if (isOtherSelected) {
      onChange(selected.filter(s => !s.startsWith(OTHER_PREFIX)))
    } else {
      onChange([...selected, OTHER_PREFIX])
    }
  }

  const handleOtherTextChange = (text: string) => {
    const withoutOther = selected.filter(s => !s.startsWith(OTHER_PREFIX))
    onChange([...withoutOther, OTHER_PREFIX + text])
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
        {config.hasOtherOption && (
          <Button
            type="button"
            variant={isOtherSelected ? 'default' : 'outline'}
            size="sm"
            onClick={handleOtherToggle}
          >
            {config.otherOptionLabel || 'Sonstiges'}
          </Button>
        )}
      </div>
      {config.hasOtherOption && isOtherSelected && (
        <Input
          placeholder={config.otherOptionPlaceholder || 'Bitte eingeben...'}
          value={otherText}
          onChange={(e) => handleOtherTextChange(e.target.value)}
          autoFocus
        />
      )}
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
