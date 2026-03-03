'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface TextFieldProps {
  config: QuestionConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

export function TextField({ config, value, error, onChange }: TextFieldProps) {
  const inputType = config.type === 'email' ? 'email' : config.type === 'tel' ? 'tel' : 'text'

  return (
    <div className="space-y-2">
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <Input
        id={config.id}
        type={inputType}
        placeholder={config.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'border-destructive' : ''}
      />
      {config.hint && (
        <p className="text-xs text-muted-foreground">{config.hint}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
