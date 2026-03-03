import type { StepConfig } from '@/lib/types'
import { formatAnswersText, formatAnswersHtml } from '@/lib/format-answers'

interface EmailData {
  variantTitle: string
  steps: StepConfig[]
  answers: Record<string, unknown>
  firstName: string
  lastName: string
  email: string
}

/** Generate the advisor notification email */
export function buildAdvisorEmail(data: EmailData) {
  const { variantTitle, steps, answers, firstName, lastName } = data
  const date = new Date().toLocaleDateString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const time = new Date().toLocaleTimeString('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const subject = `[${variantTitle}] ${firstName} ${lastName} – ${date}`

  const text = `Neuer Fragebogen eingegangen
===========================

Variante: ${variantTitle}
Eingegangen am: ${date} um ${time}

${formatAnswersText(steps, answers)}

---
Automatisch versendet vom myplanb Fragebogen.`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2D2D2D; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #FDF8F3; border-radius: 14px; padding: 24px; margin-bottom: 24px;">
    <h1 style="font-family: 'Lora', Georgia, serif; font-size: 20px; margin: 0 0 8px;">Neuer Fragebogen eingegangen</h1>
    <p style="margin: 0; color: #6B6B6B;">
      <strong>${variantTitle}</strong> &middot; ${date} um ${time}
    </p>
  </div>

  ${formatAnswersHtml(steps, answers)}

  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E4F0F2; font-size: 12px; color: #6B6B6B;">
    Automatisch versendet vom myplanb Fragebogen.
  </div>
</body>
</html>`

  return { subject, text, html }
}

/** Generate the client confirmation email */
export function buildClientEmail(data: EmailData) {
  const { firstName } = data
  const calendlyUrl = 'https://calendly.com/martina-myplanb/50min'

  const subject = 'Danke für deine Angaben – so geht es weiter'

  const text = `Hallo ${firstName},

vielen Dank, dass du dir die Zeit genommen hast! Deine Angaben sind bei mir angekommen.

So geht es weiter:
- Ich erstelle ein persönliches Profil und bereite konkrete Empfehlungen vor.
- Innerhalb weniger Werktage melde ich mich bei dir.

Du möchtest gleich einen Beratungstermin vereinbaren?\n→ ${calendlyUrl}\n
Bei Fragen erreichst du mich unter beratung@myplanb.at.

Herzliche Grüße,
Martina von myplanb`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2D2D2D; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="font-family: 'Lora', Georgia, serif; font-size: 22px;">Hallo ${firstName}!</h1>

  <p>Vielen Dank, dass du dir die Zeit genommen hast! Deine Angaben sind bei mir angekommen.</p>

  <h2 style="font-size: 16px; margin-top: 24px;">So geht es weiter:</h2>
  <ul>
    <li>Ich erstelle ein persönliches Profil und bereite konkrete Empfehlungen vor.</li>
    <li>Innerhalb weniger Werktage melde ich mich bei dir.</li>
  </ul>

  <div style="background: #FDF8F3; border-radius: 14px; padding: 24px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 16px; font-weight: 600;">Du möchtest gleich einen Beratungstermin vereinbaren?</p>
    <a href="${calendlyUrl}" style="display: inline-block; background: #1B6E7C; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600;">
      Jetzt Termin buchen
    </a>
  </div>

  <p>Bei Fragen erreichst du mich unter <a href="mailto:beratung@myplanb.at">beratung@myplanb.at</a>.</p>

  <p>Herzliche Grüße,<br><strong>Martina von myplanb</strong></p>

  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E4F0F2; font-size: 12px; color: #6B6B6B;">
    Diese E-Mail wurde automatisch versendet. Bitte antworte nicht direkt auf diese E-Mail.
  </div>
</body>
</html>`

  return { subject, text, html }
}
