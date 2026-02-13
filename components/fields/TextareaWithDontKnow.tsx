'use client'

import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { QuestionConfig, TextareaWithDontKnowValue } from '@/lib/types'

interface TextareaWithDontKnowProps {
  config: QuestionConfig
  value: TextareaWithDontKnowValue
  error?: string
  onChange: (value: TextareaWithDontKnowValue) => void
}

export function TextareaWithDontKnow({ config, value, error, onChange }: TextareaWithDontKnowProps) {
  const { text = '', dontKnow = false } = value || {}

  const handleDontKnowChange = (checked: boolean) => {
    onChange({ text: checked ? '' : text, dontKnow: checked })
  }

  const handleTextChange = (newText: string) => {
    onChange({ text: newText, dontKnow: false })
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <Textarea
        id={config.id}
        placeholder={config.placeholder}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        disabled={dontKnow}
        rows={config.rows || 3}
        className={`${error ? 'border-red-500' : ''} ${dontKnow ? 'opacity-50' : ''}`}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${config.id}-dontknow`}
          checked={dontKnow}
          onCheckedChange={(checked) => handleDontKnowChange(checked === true)}
        />
        <Label
          htmlFor={`${config.id}-dontknow`}
          className="text-sm font-normal cursor-pointer"
        >
          {config.dontKnowLabel || 'Weiß ich nicht'}
        </Label>
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
