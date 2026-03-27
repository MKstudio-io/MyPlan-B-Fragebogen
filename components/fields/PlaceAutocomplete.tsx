'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { QuestionConfig } from '@/lib/types'

interface PlaceAutocompleteProps {
  config: QuestionConfig
  value: string
  error?: string
  onChange: (value: string) => void
}

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
}

export function PlaceAutocomplete({ config, value, error, onChange }: PlaceAutocompleteProps) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/places.php?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data: NominatimResult[] = await res.json()
        setSuggestions(data)
        setIsOpen(data.length > 0)
      }
    } catch {
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (text: string) => {
    setQuery(text)
    onChange('') // Clear confirmed selection when typing

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(text), 300)
  }

  const handleSelect = (result: NominatimResult) => {
    const displayName = result.display_name
    setQuery(displayName)
    onChange(displayName)
    setSuggestions([])
    setIsOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="space-y-2" ref={containerRef}>
      <Label htmlFor={config.id}>
        {config.label}{config.required && ' *'}
      </Label>
      <div className="relative">
        <Input
          id={config.id}
          placeholder={config.placeholder || 'Ort eingeben...'}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true) }}
          className={error ? 'border-destructive' : ''}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          </div>
        )}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md max-h-60 overflow-auto">
            {suggestions.map((result, i) => (
              <button
                key={i}
                type="button"
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none"
                onClick={() => handleSelect(result)}
              >
                {result.display_name}
              </button>
            ))}
          </div>
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