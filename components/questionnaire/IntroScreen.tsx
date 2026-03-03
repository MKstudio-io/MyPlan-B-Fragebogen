'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface IntroScreenProps {
  title: string
  titleLine1?: string
  titleLine2?: string
  intro: string
  onContinue: () => void
}

export function IntroScreen({ title, titleLine1, titleLine2, intro, onContinue }: IntroScreenProps) {
  return (
    <Card>
      <CardHeader>
        {titleLine1 ? (
          <div>
            <CardTitle>{titleLine1}</CardTitle>
            <p className="text-lg text-muted-foreground mt-1">{titleLine2}</p>
          </div>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6">
          {intro.split('\n\n').map((paragraph, i) => (
            <p key={i} className={`text-muted-foreground leading-relaxed ${i > 0 ? 'mt-4' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
        <Button size="lg" onClick={onContinue} className="w-full">
          Los geht&apos;s
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
