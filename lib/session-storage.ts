const STORAGE_KEY_PREFIX = 'myplanb-q-'

interface SavedState {
  currentStep: number
  answers: Record<string, unknown>
  savedAt: string
}

export function saveFormState(
  variantId: string,
  currentStep: number,
  answers: Record<string, unknown>
) {
  if (typeof window === 'undefined') return
  try {
    const data: SavedState = {
      currentStep,
      answers,
      savedAt: new Date().toISOString(),
    }
    sessionStorage.setItem(
      `${STORAGE_KEY_PREFIX}${variantId}`,
      JSON.stringify(data)
    )
  } catch {
    // SessionStorage might be full or disabled
  }
}

export function loadFormState(variantId: string): SavedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${variantId}`)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearFormState(variantId: string) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(`${STORAGE_KEY_PREFIX}${variantId}`)
  } catch {
    // ignore
  }
}
