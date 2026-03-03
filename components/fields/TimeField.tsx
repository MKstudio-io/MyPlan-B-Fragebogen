'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { QuestionConfig } from '@/lib/types'

interface TimeFieldProps {
  config: QuestionConfig
  value: string // format: "HH:MM"
  error?: string
  onChange: (value: string) => void
}

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

export function TimeField({ config, value, error, onChange }: TimeFieldProps) {
  const parts = (value || '').split(':')
  const hour = parts[0] || ''
  const minute = parts[1] || ''

  const updatePart = (part: 'hour' | 'minute', val: string) => {
    const newHour = part === 'hour' ? val : hour
    const newMinute = part === 'minute' ? val : minute
    onChange(`${newHour}:${newMinute}`)
  }

  return (
    <div className="space-y-2">
      <Label>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="grid grid-cols-2 gap-2 max-w-[200px]">
        <Select value={hour} onValueChange={(v) => updatePart('hour', v)}>
          <SelectTrigger className={error ? 'border-destructive' : ''}>
            <SelectValue placeholder="Std" />
          </SelectTrigger>
          <SelectContent>
            {hours.map(h => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={minute} onValueChange={(v) => updatePart('minute', v)}>
          <SelectTrigger className={error ? 'border-destructive' : ''}>
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
