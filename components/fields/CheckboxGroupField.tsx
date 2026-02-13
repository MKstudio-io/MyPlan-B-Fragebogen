'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuestionConfig, CheckboxGroupValue } from '@/lib/types'

interface CheckboxGroupFieldProps {
  config: QuestionConfig
  value: CheckboxGroupValue
  error?: string
  onChange: (value: CheckboxGroupValue) => void
}

export function CheckboxGroupField({ config, value, error, onChange }: CheckboxGroupFieldProps) {
  const { selected = [], otherText = '' } = value || {}
  const exclusiveOption = config.exclusiveOption

  const allOptions = [
    ...(config.options || []),
    ...(exclusiveOption && !(config.options || []).includes(exclusiveOption) ? [exclusiveOption] : []),
  ]

  const handleToggle = (option: string) => {
    let newSelected: string[]

    if (exclusiveOption && option === exclusiveOption) {
      // Toggling the exclusive option
      if (selected.includes(option)) {
        newSelected = []
      } else {
        newSelected = [option]
      }
    } else {
      // Toggling a regular option - remove exclusive option if present
      newSelected = selected.filter(o => o !== exclusiveOption)
      if (newSelected.includes(option)) {
        newSelected = newSelected.filter(o => o !== option)
      } else {
        newSelected = [...newSelected, option]
      }
    }

    onChange({ selected: newSelected, otherText })
  }

  const handleOtherToggle = () => {
    const otherLabel = config.otherOptionLabel || 'Anderes'
    let newSelected: string[]

    if (selected.includes(otherLabel)) {
      newSelected = selected.filter(o => o !== otherLabel)
      onChange({ selected: newSelected, otherText: '' })
    } else {
      newSelected = selected.filter(o => o !== exclusiveOption)
      newSelected = [...newSelected, otherLabel]
      onChange({ selected: newSelected, otherText })
    }
  }

  const handleOtherTextChange = (text: string) => {
    onChange({ selected, otherText: text })
  }

  const otherLabel = config.otherOptionLabel || 'Anderes'
  const isOtherSelected = selected.includes(otherLabel)

  return (
    <div className="space-y-3">
      <Label>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="space-y-2">
        {allOptions.map(option => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${config.id}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => handleToggle(option)}
            />
            <Label
              htmlFor={`${config.id}-${option}`}
              className="font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
        {config.hasOtherOption && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${config.id}-other`}
                checked={isOtherSelected}
                onCheckedChange={() => handleOtherToggle()}
              />
              <Label
                htmlFor={`${config.id}-other`}
                className="font-normal cursor-pointer"
              >
                {otherLabel}
              </Label>
            </div>
            {isOtherSelected && (
              <Input
                placeholder={`${otherLabel} eingeben...`}
                value={otherText}
                onChange={(e) => handleOtherTextChange(e.target.value)}
                className="ml-6"
                autoFocus
              />
            )}
          </div>
        )}
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
