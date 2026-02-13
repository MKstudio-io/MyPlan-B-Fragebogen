'use client'

import { CategoryCard } from '@/components/landing/CategoryCard'
import config from '@/config/questionnaire.config'

export default function HomePage() {
  const { title, subtitle, cards } = config.landingPage

  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map(card => (
          <CategoryCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
