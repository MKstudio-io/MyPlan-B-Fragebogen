'use client'

import type { QuestionConfig } from '@/lib/types'
import { TextField } from '@/components/fields/TextField'
import { TextareaField } from '@/components/fields/TextareaField'
import { TextareaWithDontKnow } from '@/components/fields/TextareaWithDontKnow'
import { DateField } from '@/components/fields/DateField'
import { TimeField } from '@/components/fields/TimeField'
import { PlaceAutocomplete } from '@/components/fields/PlaceAutocomplete'
import { RadioField } from '@/components/fields/RadioField'
import { DropdownField } from '@/components/fields/DropdownField'
import { ChipsField } from '@/components/fields/ChipsField'
import { CheckboxGroupField } from '@/components/fields/CheckboxGroupField'
import { GdprCheckbox } from '@/components/fields/GdprCheckbox'
import { SliderField } from '@/components/fields/SliderField'

interface FieldRendererProps {
  config: QuestionConfig
  value: unknown
  error?: string
  onChange: (value: unknown) => void
}

export function FieldRenderer({ config, value, error, onChange }: FieldRendererProps) {
  switch (config.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <TextField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange}
        />
      )

    case 'textarea':
      return (
        <TextareaField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange}
        />
      )

    case 'textarea-with-dontknow':
      return (
        <TextareaWithDontKnow
          config={config}
          value={value as any}
          error={error}
          onChange={onChange}
        />
      )

    case 'date':
      return (
        <DateField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange}
        />
      )

    case 'time':
      return (
        <TimeField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange}
        />
      )

    case 'place-autocomplete':
      return (
        <PlaceAutocomplete
          config={config}
          value={value as string}
          error={error}
          onChange={onChange as (v: string) => void}
        />
      )

    case 'radio':
      return (
        <RadioField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange as (v: string) => void}
        />
      )

    case 'dropdown':
      return (
        <DropdownField
          config={config}
          value={value as string}
          error={error}
          onChange={onChange as (v: string) => void}
        />
      )

    case 'chips':
      return (
        <ChipsField
          config={config}
          value={value as string[]}
          error={error}
          onChange={onChange as (v: string[]) => void}
        />
      )

    case 'checkbox-group':
      return (
        <CheckboxGroupField
          config={config}
          value={value as any}
          error={error}
          onChange={onChange}
        />
      )

    case 'gdpr-checkbox':
      return (
        <GdprCheckbox
          config={config}
          value={value as boolean}
          error={error}
          onChange={onChange as (v: boolean) => void}
        />
      )

    case 'slider':
      return (
        <SliderField
          config={config}
          value={value as number | undefined}
          error={error}
          onChange={onChange as (v: number) => void}
        />
      )

    default:
      return <p className="text-destructive">Unbekannter Feldtyp: {config.type}</p>
  }
}
