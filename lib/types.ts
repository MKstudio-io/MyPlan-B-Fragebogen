/** Field types supported by the form engine */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'textarea-with-dontknow'
  | 'date'
  | 'time'
  | 'place-autocomplete'
  | 'radio'
  | 'dropdown'
  | 'chips'
  | 'checkbox-group'
  | 'email'
  | 'tel'
  | 'gdpr-checkbox'

/** A single question/field in the questionnaire */
export interface QuestionConfig {
  id: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  hint?: string
  options?: string[]
  dontKnowLabel?: string
  hasOtherOption?: boolean
  otherOptionLabel?: string
  exclusiveOption?: string
  rows?: number
  gdprText?: string
}

/** A single step in the questionnaire */
export interface StepConfig {
  id: string
  title: string
  description?: string
  questions: QuestionConfig[]
}

/** Landing page card configuration */
export interface LandingCardConfig {
  id: string
  title: string
  subtitle: string
  bullets: string[]
  buttonText: string
  /** Direct variant link, or subcategories if multiple */
  variantId?: string
  subcategories?: {
    id: string
    label: string
    description: string
    variantId: string
    placeholder?: boolean
  }[]
}

/** A complete questionnaire variant */
export interface VariantConfig {
  id: string
  title: string
  shortTitle: string
  intro: string
  placeholder?: boolean
  placeholderText?: string
  steps: StepConfig[]
  confirmationTitle: string
  confirmationText: string
  emailSubjectClient: string
  emailSubjectAdvisor: string
}

/** Top-level config */
export interface QuestionnaireConfig {
  variants: Record<string, VariantConfig>
  landingPage: {
    title: string
    subtitle: string
    cards: LandingCardConfig[]
  }
  globalTexts: {
    nextButton: string
    backButton: string
    submitButton: string
    requiredFieldHint: string
    privacyPolicyUrl: string
  }
}

/** Form state managed by QuestionnaireEngine */
export interface FormState {
  variantId: string
  currentStep: number
  showIntro: boolean
  showSummary: boolean
  isSubmitting: boolean
  submitError: string | null
  answers: Record<string, unknown>
  errors: Record<string, string>
  startedAt: number
}

/** Value type for textarea-with-dontknow fields */
export interface TextareaWithDontKnowValue {
  text: string
  dontKnow: boolean
}

/** Value type for radio fields with "other" option */
export interface RadioWithOtherValue {
  option: string
  otherText?: string
}

/** Value type for checkbox-group fields with "other" option */
export interface CheckboxGroupValue {
  selected: string[]
  otherText?: string
}

/** Place autocomplete result */
export interface PlaceResult {
  displayName: string
  lat?: number
  lon?: number
}

/** Submission payload sent to API */
export interface SubmissionPayload {
  variantId: string
  variantTitle: string
  answers: Record<string, unknown>
  /** Honeypot field */
  _hp_field?: string
  /** Timestamp when form was started */
  _started_at?: number
}
