import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DatenschutzPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold mt-6 mb-2">1. Verantwortliche Stelle</h3>
          <p className="text-muted-foreground">
            myplanb<br />
            [Adresse wird ergänzt]<br />
            E-Mail: beratung@myplanb.at
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">2. Erhobene Daten</h3>
          <p className="text-muted-foreground">
            Im Rahmen des Online-Fragebogens erheben wir folgende personenbezogene Daten:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
            <li>Geburtsdatum, Geburtszeit und Geburtsort</li>
            <li>Angaben zur aktuellen Lebenssituation (beruflich/schulisch)</li>
            <li>Interessen, Stärken und persönliche Wünsche</li>
            <li>Kontaktdaten (Name, E-Mail-Adresse, optional Telefonnummer)</li>
            <li>Bei Minderjährigen: Angaben der Erziehungsberechtigten</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">3. Zweck der Verarbeitung</h3>
          <p className="text-muted-foreground">
            Die erhobenen Daten dienen ausschließlich der Erstellung einer persönlichen
            Potenzialanalyse und der Kontaktaufnahme im Rahmen der myplanb-Beratung.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">4. Rechtsgrundlage</h3>
          <p className="text-muted-foreground">
            Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
            Bei Minderjährigen erfolgt die Einwilligung durch die Erziehungsberechtigten gemäß Art. 8 DSGVO.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">5. Datenweitergabe</h3>
          <p className="text-muted-foreground">
            Ihre Daten werden nicht an Dritte weitergegeben. Die Übermittlung erfolgt
            ausschließlich per E-Mail an das myplanb-Berater-Team über einen eigenen SMTP-Server.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">6. Speicherdauer</h3>
          <p className="text-muted-foreground">
            Die Daten werden per E-Mail übermittelt und nicht dauerhaft in einer Datenbank gespeichert.
            Die E-Mails werden so lange aufbewahrt, wie es für die Beratung erforderlich ist,
            und auf Wunsch gelöscht.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">7. Ihre Rechte</h3>
          <p className="text-muted-foreground">
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Widerruf
            Ihrer Einwilligung. Kontaktieren Sie uns unter beratung@myplanb.at.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">8. Technische Sicherheit</h3>
          <p className="text-muted-foreground">
            Die gesamte Webseite wird über HTTPS (SSL/TLS) bereitgestellt.
            Die E-Mail-Übermittlung erfolgt verschlüsselt über STARTTLS/SSL.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
