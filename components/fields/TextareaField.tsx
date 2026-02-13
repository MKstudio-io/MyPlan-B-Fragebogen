'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface TextareaFieldProps {
  config: QuestionConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

export function TextareaField({ config, value, error, onChange }: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <Textarea
        id={config.id}
        placeholder={config.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={config.rows || 3}
        className={error ? 'border-red-500' : ''}
      />
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
