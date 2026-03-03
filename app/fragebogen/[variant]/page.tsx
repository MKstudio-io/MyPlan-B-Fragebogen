import { getAllVariantIds } from '@/config/questionnaire.config'
import QuestionnairePageClient from './QuestionnairePageClient'

export function generateStaticParams() {
  return getAllVariantIds().map((id) => ({ variant: id }))
}

export default function QuestionnairePage({ params }: { params: { variant: string } }) {
  return <QuestionnairePageClient variantId={params.variant} />
}
