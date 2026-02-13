import type { StepConfig, TextareaWithDontKnowValue, CheckboxGroupValue } from './types'
import { OTHER_PREFIX } from './constants'

/** Format a single answer value as readable text */
function formatValue(type: string, value: unknown): string {
  if (value === undefined || value === null || value === '') return '–'

  switch (type) {
    case 'textarea-with-dontknow': {
      const v = value as TextareaWithDontKnowValue
      if (v.dontKnow) return 'Weiß ich nicht'
      return v.text || '–'
    }
    case 'chips': {
      const arr = value as string[]
      return arr.length > 0 ? arr.join(', ') : '–'
    }
    case 'checkbox-group': {
      const v = value as CheckboxGroupValue
      const items = [...(v.selected || [])]
      if (v.otherText) {
        const idx = items.findIndex(s => s === 'Anderes' || s === 'Sonstiges')
        if (idx >= 0) items[idx] = `${items[idx]}: ${v.otherText}`
      }
      return items.length > 0 ? items.join(', ') : '–'
    }
    case 'radio': {
      const str = value as string
      if (str.startsWith(OTHER_PREFIX)) {
        return `Sonstiges: ${str.slice(OTHER_PREFIX.length) || '–'}`
      }
      return str
    }
    case 'gdpr-checkbox':
      return value === true ? 'Ja' : 'Nein'
    default:
      return String(value)
  }
}

/** Format all answers as structured plain text for the advisor email */
export function formatAnswersText(
  steps: StepConfig[],
  answers: Record<string, unknown>
): string {
  const lines: string[] = []

  for (const step of steps) {
    lines.push(`--- ${step.title} ---`)
    for (const question of step.questions) {
      if (question.type === 'gdpr-checkbox') continue // Skip GDPR in overview
      const val = formatValue(question.type, answers[question.id])
      lines.push(`${question.label}: ${val}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/** Format all answers as HTML for the advisor email */
export function formatAnswersHtml(
  steps: StepConfig[],
  answers: Record<string, unknown>
): string {
  const sections: string[] = []

  for (const step of steps) {
    const rows = step.questions
      .filter(q => q.type !== 'gdpr-checkbox')
      .map(question => {
        const val = formatValue(question.type, answers[question.id])
        return `<tr>
          <td style="padding: 6px 12px 6px 0; color: #718096; vertical-align: top; width: 200px; font-size: 14px;">${question.label}</td>
          <td style="padding: 6px 0; font-size: 14px;">${escapeHtml(val)}</td>
        </tr>`
      })
      .join('\n')

    sections.push(`
      <h3 style="color: #2D3748; margin: 24px 0 8px; font-size: 16px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">${step.title}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows}
      </table>
    `)
  }

  return sections.join('\n')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}
