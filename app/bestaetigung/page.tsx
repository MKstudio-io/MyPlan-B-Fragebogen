'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Script from 'next/script'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { getVariant } from '@/config/questionnaire.config'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get('name') || ''
  const variantId = searchParams.get('variant') || ''
  const crossHint = searchParams.get('crossHint') === '1'
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
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {text}
          </p>

          {calendlyUrl && (
            <div className="rounded-lg overflow-hidden">
              <p className="font-medium mb-4">
                Du möchtest gleich einen Beratungstermin vereinbaren?
              </p>
              <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/martina-myplanb/50min?primary_color=ffbd59"
                style={{ minWidth: '280px', height: '700px' }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </div>
          )}

          {crossHint && variant?.crossVariantHint && (
            <div className="p-6 bg-muted rounded-lg space-y-3 text-left">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {variant.crossVariantHint.message}
              </p>
              <Button variant="outline" asChild>
                <a href={`/fragebogen/${variant.crossVariantHint.linkVariantId}`}>
                  {variant.crossVariantHint.linkText}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
