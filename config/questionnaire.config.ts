import configData from './questionnaire.json'
import type { QuestionnaireConfig, VariantConfig } from '@/lib/types'

const config = configData as unknown as QuestionnaireConfig

export function getVariant(variantId: string): VariantConfig | undefined {
  return config.variants[variantId]
}

export function getAllVariantIds(): string[] {
  return Object.keys(config.variants)
}

export function getLandingPageConfig() {
  return config.landingPage
}

export function getGlobalTexts() {
  return config.globalTexts
}

export default config
