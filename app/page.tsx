'use client'

import Image from 'next/image'
import { CategoryCard } from '@/components/landing/CategoryCard'
import config from '@/config/questionnaire.config'

export default function HomePage() {
  const { title, subtitle, cards } = config.landingPage

  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="text-center mb-12">
        <Image
          src="/myplanbfragebogen/Logo_PlanB_s-p.png"
          alt="MyPlanB"
          width={400}
          height={192}
          className="mx-auto mb-4"
          priority
        />
        <h1 className="mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
        <p className="text-sm italic text-muted-foreground mt-2">
          Dauert nur 2–3 Minuten.
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