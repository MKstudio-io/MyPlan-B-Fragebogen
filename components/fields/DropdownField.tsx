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

interface DropdownFieldProps {
  config: QuestionConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

export function DropdownField({ config, value, error, onChange }: DropdownFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className={error ? 'border-red-500' : ''}>
          <SelectValue placeholder={config.placeholder || 'Bitte wählen...'} />
        </SelectTrigger>
        <SelectContent>
          {(config.options || []).map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
