'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react'
import { getVariant } from '@/config/questionnaire.config'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get('name') || ''
  const variantId = searchParams.get('variant') || ''
  const variant = getVariant(variantId)

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

  const title = variant?.confirmationTitle
    ? variant.confirmationTitle.replace('{firstName}', firstName)
    : `Vielen Dank${firstName ? `, ${firstName}` : ''}!`

  const text = variant?.confirmationText || 'Deine Angaben sind bei mir angekommen.'

  return (
    <div className="container py-12 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {text}
          </p>

          {calendlyUrl && (
            <div className="p-6 bg-muted/30 rounded-lg space-y-4">
              <p className="font-medium">
                Du möchtest gleich einen Beratungstermin vereinbaren?
              </p>
              <Button
                variant="accent"
                size="xl"
                asChild
              >
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Jetzt Beratungstermin vereinbaren
                </a>
              </Button>
            </div>
          )}

          <div className="pt-4">
            <Button variant="ghost" asChild>
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Startseite
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container py-12 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
