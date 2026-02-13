import type { QuestionConfig, StepConfig, TextareaWithDontKnowValue, CheckboxGroupValue } from './types'
import { OTHER_PREFIX } from './constants'

/** Validate a single step's answers. Returns a map of field_id -> error message. */
export function validateStep(
  step: StepConfig,
  answers: Record<string, unknown>
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const question of step.questions) {
    const error = validateField(question, answers[question.id])
    if (error) {
      errors[question.id] = error
    }
  }

  return errors
}

/** Validate a single field value. Returns error string or null. */
export function validateField(
  config: QuestionConfig,
  value: unknown
): string | null {
  if (!config.required) return null

  switch (config.type) {
    case 'text':
    case 'email':
    case 'tel': {
      const str = (value as string)?.trim()
      if (!str) return `Bitte ${config.label} eingeben`
      if (config.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
        return 'Bitte eine gültige E-Mail-Adresse eingeben'
      }
      return null
    }

    case 'textarea': {
      const str = (value as string)?.trim()
      if (!str) return `Bitte ${config.label} ausfüllen`
      return null
    }

    case 'textarea-with-dontknow': {
      const v = value as TextareaWithDontKnowValue | undefined
      if (!v) return `Bitte ${config.label} ausfüllen`
      if (!v.dontKnow && !v.text?.trim()) {
        return `Bitte ${config.label} ausfüllen oder "Weiß ich nicht" ankreuzen`
      }
      return null
    }

    case 'date': {
      const str = (value as string) || ''
      const parts = str.split('.')
      if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
        return 'Bitte ein vollständiges Datum angeben'
      }
      return null
    }

    case 'time': {
      const str = (value as string) || ''
      const parts = str.split(':')
      if (parts.length !== 2 || !parts[0] || !parts[1]) {
        return 'Bitte eine vollständige Uhrzeit angeben'
      }
      return null
    }

    case 'place-autocomplete': {
      const str = (value as string)?.trim()
      if (!str) return 'Bitte einen Ort auswählen'
      return null
    }

    case 'radio': {
      const str = (value as string) || ''
      if (!str) return `Bitte eine Option wählen`
      // If "other" is selected, check that text is provided
      if (str === OTHER_PREFIX) {
        return 'Bitte einen Text eingeben'
      }
      if (str.startsWith(OTHER_PREFIX) && !str.slice(OTHER_PREFIX.length).trim()) {
        return 'Bitte einen Text eingeben'
      }
      return null
    }

    case 'dropdown': {
      const str = (value as string) || ''
      if (!str) return `Bitte ${config.label} wählen`
      return null
    }

    case 'chips': {
      const arr = (value as string[]) || []
      if (arr.length === 0) return `Bitte mindestens eine Option wählen`
      return null
    }

    case 'checkbox-group': {
      const v = value as CheckboxGroupValue | undefined
      if (!v || v.selected.length === 0) return `Bitte mindestens eine Option wählen`
      return null
    }

    case 'gdpr-checkbox': {
      if (value !== true) return 'Bitte stimme der Datenschutzerklärung zu'
      return null
    }

    default:
      return null
  }
}

/** Server-side validation for the full submission */
export function validateSubmission(
  steps: StepConfig[],
  answers: Record<string, unknown>
): { field: string; message: string }[] {
  const errors: { field: string; message: string }[] = []

  for (const step of steps) {
    for (const question of step.questions) {
      const error = validateField(question, answers[question.id])
      if (error) {
        errors.push({ field: question.id, message: error })
      }
    }
  }

  return errors
}
