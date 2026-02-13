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

interface DateFieldProps {
  config: QuestionConfig
  value: string // format: "DD.MM.YYYY"
  error?: string
  onChange: (value: string) => void
}

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
const months = [
  { value: '01', label: 'Jänner' },
  { value: '02', label: 'Februar' },
  { value: '03', label: 'März' },
  { value: '04', label: 'April' },
  { value: '05', label: 'Mai' },
  { value: '06', label: 'Juni' },
  { value: '07', label: 'Juli' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Dezember' },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 80 }, (_, i) => String(currentYear - i))

export function DateField({ config, value, error, onChange }: DateFieldProps) {
  const parts = (value || '').split('.')
  const day = parts[0] || ''
  const month = parts[1] || ''
  const year = parts[2] || ''

  const updatePart = (part: 'day' | 'month' | 'year', val: string) => {
    const newDay = part === 'day' ? val : day
    const newMonth = part === 'month' ? val : month
    const newYear = part === 'year' ? val : year
    onChange(`${newDay}.${newMonth}.${newYear}`)
  }

  return (
    <div className="space-y-2">
      <Label>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="grid grid-cols-3 gap-2">
        <Select value={day} onValueChange={(v) => updatePart('day', v)}>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            {days.map(d => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month} onValueChange={(v) => updatePart('month', v)}>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Monat" />
          </SelectTrigger>
          <SelectContent>
            {months.map(m => (
              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={(v) => updatePart('year', v)}>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Jahr" />
          </SelectTrigger>
          <SelectContent>
            {years.map(y => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
