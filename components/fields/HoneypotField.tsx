'use client'

interface HoneypotFieldProps {
  value: string
  onChange: (value: string) => void
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
    >
      <label htmlFor="_hp_field">Leave this empty</label>
      <input
        type="text"
        id="_hp_field"
        name="_hp_field"
        tabIndex={-1}
        autoComplete="off"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
