'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface SliderFieldProps {
  config: QuestionConfig
  value: number | undefined
  error?: string
  onChange: (value: number) => void
}

export function SliderField({ config, value, error, onChange }: SliderFieldProps) {
  const min = config.min ?? 0
  const max = config.max ?? 10
  const [hasInteracted, setHasInteracted] = useState(value !== undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true)
    onChange(Number(e.target.value))
  }

  return (
    <div className="space-y-3">
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="px-1">
        <input
          type="range"
          id={config.id}
          min={min}
          max={max}
          step={1}
          value={hasInteracted && value !== undefined ? value : Math.floor((min + max) / 2)}
          onChange={handleChange}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary ${
            !hasInteracted ? 'opacity-40' : ''
          }`}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">{config.minLabel || String(min)}</span>
          <span className="text-xs text-muted-foreground">{config.maxLabel || String(max)}</span>
        </div>
        {hasInteracted && value !== undefined && (
          <p className="text-center text-sm font-medium mt-1">{value}</p>
        )}
        {!hasInteracted && (
          <p className="text-center text-xs text-muted-foreground mt-1">Bitte Schieberegler bewegen</p>
        )}
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
