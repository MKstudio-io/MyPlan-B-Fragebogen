'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VariantConfig, CheckboxGroupValue } from '@/lib/types'
import { validateStep } from '@/lib/validation'
import { saveFormState, loadFormState, clearFormState } from '@/lib/session-storage'
import config from '@/config/questionnaire.config'
import { ProgressBar } from './ProgressBar'
import { StepRenderer } from './StepRenderer'
import { StepNavigation } from './StepNavigation'
import { IntroScreen } from './IntroScreen'
import { SummaryStep } from './SummaryStep'
import { HoneypotField } from '@/components/fields/HoneypotField'

interface QuestionnaireEngineProps {
  variant: VariantConfig
}

export function QuestionnaireEngine({ variant }: QuestionnaireEngineProps) {
  const router = useRouter()
  const globalTexts = config.globalTexts

  const [currentStep, setCurrentStep] = useState(-1) // -1 = intro
  const [showSummary, setShowSummary] = useState(false)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const startedAtRef = useRef(Date.now())
  const [hydrated, setHydrated] = useState(false)

  // Restore from SessionStorage
  useEffect(() => {
    const saved = loadFormState(variant.id)
    if (saved) {
      setCurrentStep(saved.currentStep)
      setAnswers(saved.answers)
    }
    setHydrated(true)
  }, [variant.id])

  // Save to SessionStorage on changes (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!hydrated || currentStep < 0) return
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      saveFormState(variant.id, currentStep, answers)
    }, 500)
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [currentStep, answers, variant.id, hydrated])

  const handleFieldChange = useCallback((fieldId: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [fieldId]: value }))
    setErrors(prev => {
      if (!prev[fieldId]) return prev
      const next = { ...prev }
      delete next[fieldId]
      return next
    })
  }, [])

  const handleNext = () => {
    if (showSummary) {
      handleSubmit()
      return
    }

    const step = variant.steps[currentStep]
    const stepErrors = validateStep(step, answers)

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      // Scroll to first error
      const firstErrorField = step.questions.find(q => stepErrors[q.id])
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField.id)
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    if (currentStep < variant.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setErrors({})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setShowSummary(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false)
      return
    }
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setErrors({})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleEditStep = (stepIndex: number) => {
    setShowSummary(false)
    setCurrentStep(stepIndex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch(`/myplanbfragebogen/api/submit.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: variant.id,
          variantTitle: variant.shortTitle,
          answers,
          _hp_field: honeypot,
          _started_at: startedAtRef.current,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.')
      }

      clearFormState(variant.id)

      // Get first name for confirmation page
      const firstName = (answers.first_name as string) || ''
      let redirectUrl = `/bestaetigung?name=${encodeURIComponent(firstName)}&variant=${variant.id}`

      // Check cross-variant hint (e.g. career reorientation hint for privat variant)
      if (variant.crossVariantHint) {
        const { triggerField, triggerValue, triggerValues } = variant.crossVariantHint
        const fieldValue = answers[triggerField]
        let showCrossHint = false

        // Support multiple trigger values (triggerValues array) or single triggerValue
        const valuesToCheck = triggerValues || (triggerValue ? [triggerValue] : [])

        if (fieldValue && typeof fieldValue === 'object' && 'selected' in (fieldValue as Record<string, unknown>)) {
          // Checkbox-group field: check if any trigger value is in selected array
          const selected = (fieldValue as CheckboxGroupValue).selected
          showCrossHint = valuesToCheck.some(v => selected.includes(v))
        } else if (typeof fieldValue === 'string') {
          // Radio/text field: check if value matches any trigger value
          showCrossHint = valuesToCheck.includes(fieldValue)
        }

        if (showCrossHint) {
          redirectUrl += '&crossHint=1'
        }
      }

      router.push(redirectUrl)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render until hydrated to avoid SSR/client mismatch
  if (!hydrated) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-muted rounded w-full mb-8" />
        <div className="h-64 bg-muted rounded" />
      </div>
    )
  }

  // Intro screen
  if (currentStep < 0) {
    return (
      <IntroScreen
        title={variant.title}
        titleLine1={variant.titleLine1}
        titleLine2={variant.titleLine2}
        intro={variant.intro}
        onContinue={() => setCurrentStep(0)}
      />
    )
  }

  // Summary screen
  if (showSummary) {
    return (
      <div className="space-y-6">
        <ProgressBar
          steps={variant.steps}
          currentStepIndex={variant.steps.length - 1}
        />
        <SummaryStep
          steps={variant.steps}
          answers={answers}
          onEditStep={handleEditStep}
        />
        {submitError && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
            {submitError}
          </div>
        )}
        <div className="relative">
          <HoneypotField value={honeypot} onChange={setHoneypot} />
          <StepNavigation
            currentStep={currentStep}
            totalSteps={variant.steps.length}
            isLastStep={true}
            isSubmitting={isSubmitting}
            backLabel={globalTexts.backButton}
            nextLabel={globalTexts.nextButton}
            submitLabel={variant.submitButtonLabel || globalTexts.submitButton}
            onBack={handleBack}
            onNext={handleSubmit}
          />
        </div>
      </div>
    )
  }

  // Regular step
  const step = variant.steps[currentStep]
  const isLastStep = currentStep === variant.steps.length - 1

  return (
    <div className="space-y-6">
      <ProgressBar
        steps={variant.steps}
        currentStepIndex={currentStep}
      />

      <Card>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <StepRenderer
            step={step}
            answers={answers}
            errors={errors}
            onChange={handleFieldChange}
          />
          <StepNavigation
            currentStep={currentStep}
            totalSteps={variant.steps.length}
            isLastStep={false}
            isSubmitting={false}
            backLabel={globalTexts.backButton}
            nextLabel={isLastStep ? 'Zur Zusammenfassung' : globalTexts.nextButton}
            submitLabel={variant.submitButtonLabel || globalTexts.submitButton}
            onBack={handleBack}
            onNext={handleNext}
          />
        </CardContent>
      </Card>
    </div>
  )
}
