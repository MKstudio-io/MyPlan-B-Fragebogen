'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight } from 'lucide-react'
import type { LandingCardConfig } from '@/lib/types'

interface CategoryCardProps {
  card: LandingCardConfig
}

export function CategoryCard({ card }: CategoryCardProps) {
  const router = useRouter()
  const [showSubcategories, setShowSubcategories] = useState(false)

  const handleClick = () => {
    if (card.variantId) {
      router.push(`/fragebogen/${card.variantId}`)
    } else if (card.subcategories) {
      setShowSubcategories(!showSubcategories)
    }
  }

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{card.title}</CardTitle>
        <CardDescription>{card.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 mb-6 flex-1">
          {card.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {!showSubcategories ? (
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={handleClick}
          >
            {card.buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <div className="space-y-2">
            {card.subcategories?.map(sub => (
              <button
                key={sub.id}
                className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                onClick={() => {
                  if (sub.placeholder) {
                    router.push(`/fragebogen/${sub.variantId}`)
                  } else {
                    router.push(`/fragebogen/${sub.variantId}`)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{sub.label}</div>
                    <div className="text-xs text-muted-foreground">{sub.description}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                {sub.placeholder && (
                  <span className="inline-block mt-1 text-xs bg-muted px-2 py-0.5 rounded">
                    Bald verfügbar
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
