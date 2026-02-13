import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { getVariant } from '@/config/questionnaire.config'
import { validateSubmission } from '@/lib/validation'
import { buildAdvisorEmail, buildClientEmail } from '@/config/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot check - silently accept to not reveal the trap
    if (body._hp_field) {
      return NextResponse.json({ success: true })
    }

    // Time-based check - reject if submitted in under 3 seconds
    if (body._started_at && Date.now() - body._started_at < 3000) {
      return NextResponse.json({ success: true })
    }

    const { variantId, variantTitle, answers } = body

    // Load variant config
    const variant = getVariant(variantId)
    if (!variant || variant.placeholder) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Fragebogen-Variante' },
        { status: 400 }
      )
    }

    // Server-side validation
    const validationErrors = validateSubmission(variant.steps, answers)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      )
    }

    const firstName = (answers.first_name as string) || ''
    const lastName = (answers.last_name as string) || ''
    const clientEmail = (answers.email as string) || ''

    const emailData = {
      variantTitle: variantTitle || variant.shortTitle,
      steps: variant.steps,
      answers,
      firstName,
      lastName,
      email: clientEmail,
    }

    // Build emails
    const advisorEmail = buildAdvisorEmail(emailData)
    const clientConfirmation = buildClientEmail(emailData)

    const recipientEmails = process.env.RECIPIENT_EMAILS || ''

    // Send emails with retry
    const sendBoth = async () => {
      const promises: Promise<unknown>[] = []

      if (recipientEmails) {
        promises.push(
          sendEmail(recipientEmails, advisorEmail.subject, advisorEmail.html, advisorEmail.text)
        )
      }

      if (clientEmail) {
        promises.push(
          sendEmail(clientEmail, clientConfirmation.subject, clientConfirmation.html, clientConfirmation.text)
        )
      }

      await Promise.all(promises)
    }

    try {
      await sendBoth()
    } catch (firstError) {
      console.error('First email attempt failed:', firstError)
      // Retry once
      try {
        await sendBoth()
      } catch (retryError) {
        console.error('Email retry failed:', retryError)
        return NextResponse.json(
          { success: false, error: 'E-Mail-Versand fehlgeschlagen. Bitte versuche es erneut.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    )
  }
}
