'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface GdprCheckboxProps {
  config: QuestionConfig
  value: boolean
  error?: string
  onChange: (value: boolean) => void
}

/** Parse a single line for markdown links [text](url) */
function renderLineParts(line: string, lineIdx: number) {
  const parts = line.split(/(\[.*?\]\(.*?\))/)
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/)
    if (match) {
      return (
        <a
          key={`${lineIdx}-${i}`}
          href={match[2]}
          target={match[2].startsWith('/') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="text-accent underline hover:text-accent/80"
        >
          {match[1]}
        </a>
      )
    }
    return <span key={`${lineIdx}-${i}`}>{part}</span>
  })
}

/** Parse GDPR text with newlines and markdown links */
function renderGdprText(text: string) {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => (
    <span key={lineIdx}>
      {lineIdx > 0 && <br />}
      {renderLineParts(line, lineIdx)}
    </span>
  ))
}

export function GdprCheckbox({ config, value, error, onChange }: GdprCheckboxProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3 p-4 rounded-lg border bg-muted/30">
        <Checkbox
          id={config.id}
          checked={value || false}
          onCheckedChange={(checked) => onChange(checked === true)}
          className="mt-0.5"
        />
        <Label
          htmlFor={config.id}
          className="text-sm font-normal leading-relaxed cursor-pointer"
        >
          {config.gdprText ? renderGdprText(config.gdprText) : config.label}
        </Label>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
