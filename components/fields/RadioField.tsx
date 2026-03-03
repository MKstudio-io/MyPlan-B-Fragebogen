'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { QuestionConfig } from '@/lib/types'
import { OTHER_PREFIX } from '@/lib/constants'

interface RadioFieldProps {
  config: QuestionConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

export function RadioField({ config, value, error, onChange }: RadioFieldProps) {
  const isOtherSelected = value?.startsWith(OTHER_PREFIX)
  const otherText = isOtherSelected ? value.slice(OTHER_PREFIX.length) : ''
  const selectedOption = isOtherSelected ? OTHER_PREFIX : value

  const handleRadioChange = (newValue: string) => {
    if (newValue === OTHER_PREFIX) {
      onChange(OTHER_PREFIX)
    } else {
      onChange(newValue)
    }
  }

  const handleOtherTextChange = (text: string) => {
    onChange(OTHER_PREFIX + text)
  }

  return (
    <div className="space-y-3">
      <Label>
        {config.label}{config.required && ' *'}
      </Label>
      <RadioGroup value={selectedOption} onValueChange={handleRadioChange}>
        {(config.options || []).map(option => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${config.id}-${option}`} />
            <Label htmlFor={`${config.id}-${option}`} className="font-normal cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
        {config.hasOtherOption && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={OTHER_PREFIX} id={`${config.id}-other`} />
              <Label htmlFor={`${config.id}-other`} className="font-normal cursor-pointer">
                {config.otherOptionLabel || 'Sonstiges'}
              </Label>
            </div>
            {isOtherSelected && (
              <Input
                placeholder={config.otherOptionPlaceholder || `${config.otherOptionLabel || 'Sonstiges'} eingeben...`}
                value={otherText}
                onChange={(e) => handleOtherTextChange(e.target.value)}
                className="ml-6"
                autoFocus
              />
            )}
          </div>
        )}
      </RadioGroup>
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
