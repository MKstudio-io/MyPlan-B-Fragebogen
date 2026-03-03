'use client'

import { useRouter } from 'next/navigation'
import { getVariant } from '@/config/questionnaire.config'
import { QuestionnaireEngine } from '@/components/questionnaire/QuestionnaireEngine'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Clock } from 'lucide-react'

interface QuestionnairePageClientProps {
  variantId: string
}

export default function QuestionnairePageClient({ variantId }: QuestionnairePageClientProps) {
  const router = useRouter()
  const variant = getVariant(variantId)

  if (!variant) {
    return (
      <div className="container py-12 max-w-3xl text-center">
        <h2>Fragebogen nicht gefunden</h2>
        <p className="text-muted-foreground mt-2">
          Der angeforderte Fragebogen existiert nicht.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>
      </div>
    )
  }

  if (variant.placeholder) {
    return (
      <div className="container py-12 max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>{variant.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              {variant.placeholderText}
            </p>
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <QuestionnaireEngine variant={variant} />
    </div>
  )
}
