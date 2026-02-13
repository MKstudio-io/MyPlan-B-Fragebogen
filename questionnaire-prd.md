# PRD: myplanb Online-Fragebogen

**Projekt:** myplanb.at – Online-Fragebogen für persönliche Analyse & Beratung  
**Version:** 1.1  
**Datum:** 13. Februar 2026  
**Status:** Entwurf

---

## 1. Überblick

### 1.1 Zielsetzung

Ein webbasierter Fragebogen, über den potenzielle Kunden ihre persönliche Situation strukturiert erfassen können – als Vorbereitung auf eine individuelle Potenzialanalyse durch myplanb. Die Ergebnisse werden per E-Mail an das Berater-Team übermittelt und anschließend manuell in die bestehende Analyse-App übertragen.

### 1.2 Kernziele

- **Für Kunden:** Niedrigschwelliger, einladender Einstieg in die myplanb-Beratung. Kein Vorwissen nötig, kein Bewertungsdruck.
- **Für das Berater-Team:** Strukturierte, vollständige Informationen vorab erhalten, die direkt in die Analyse-App übertragbar sind. Zeitersparnis im Erstgespräch.
- **Business:** Lead-Generierung durch Fragebogen → Terminbuchung als nahtloser Funnel.

### 1.3 Hinweis zur Terminologie

Der Begriff "Human Design" wird auf der Website und im Fragebogen **nicht** verwendet (mögliche markenrechtliche Einschränkungen). Stattdessen werden neutrale Begriffe eingesetzt:

| Statt | Verwenden |
|---|---|
| Human Design Analyse | Persönliche Potenzialanalyse / myplanb Analyse |
| Human Design Chart | Persönlichkeitsprofil / dein Profil |
| Human Design Beratung | Persönliche Beratung / myplanb Beratung |

### 1.4 Zielgruppen

| Zielgruppe | Beschreibung |
|---|---|
| Erwachsene – berufliche Neuorientierung | Angestellte, Selbstständige, Arbeitssuchende, die berufliche Klarheit suchen |
| Erwachsene – private Veränderung | Personen in privaten Umbruchphasen (Platzhalter, Fragen noch zu definieren) |
| Schüler:innen + Eltern | Eltern und Jugendliche bei Schulwahl, Berufsorientierung, Lernunterstützung |

---

## 2. User Flow

### 2.1 Gesamtablauf

```
Startseite (Auswahlseite)
    │
    ├── "Für Erwachsene"
    │       │
    │       ├── Berufliche Neuorientierung → Fragebogen
    │       └── Private Veränderung (Platzhalter) → Fragebogen
    │
    └── "Für Schüler:innen + Eltern" → Fragebogen (eine Variante)
    │
    ▼
Fragebogen (mehrstufig)
    │
    ▼
Zusammenfassung & Absenden
    │
    ▼
Bestätigungsseite
    ├── Bestätigungs-E-Mail an Kunden
    ├── Ergebnis-E-Mail an Berater-Team
    └── Calendly-Integration: "Jetzt Termin buchen"
```

### 2.2 Startseite / Auswahlseite

Die Startseite orientiert sich am bestehenden Design der Analyse-App. Zwei Hauptkategorien werden als Cards dargestellt:

**Card 1: "Für Erwachsene"**
- Untertitel: "Neuorientierung, Jobwechsel oder Klarheit im Beruf"
- Stichpunkte: Analyse deiner beruflichen Grundlage / Passende Rollen und Arbeitsumfelder / Konkrete nächste Schritte
- Button: "Analyse starten →"
- Nach Klick: Unterkategorie-Auswahl (beruflich / privat)

**Card 2: "Für Schüler:innen + Eltern"**
- Untertitel: "Schulwahl, Berufsorientierung oder Lernunterstützung"
- Stichpunkte: Stärken und Lerntyp erkennen / Passende Bildungswege & Berufsfelder / Konkrete Empfehlungen für den weiteren Weg
- Button: "Analyse starten →"
- Führt direkt zum Fragebogen (keine weitere Unterkategorie-Auswahl)

### 2.3 Fragebogen-Flow

Der Fragebogen wird als mehrstufiges Formular (Multi-Step) dargestellt, nicht als eine lange Seite. Jeder Schritt zeigt eine logische Fragengruppe. Ein Fortschrittsbalken zeigt dem Nutzer, wie weit er ist.

**Vorteile Multi-Step:**
- Weniger überwältigend für den Nutzer
- Höhere Abschlussrate
- Möglichkeit zur Validierung pro Schritt
- Mobilfreundlicher

---

## 3. Fragebogen-Inhalte

### 3.1 Erwachsene – Berufliche Neuorientierung

**Einleitung (wird vor Schritt 1 angezeigt):**

> Dieser Fragebogen hilft mir, deine Situation besser zu verstehen – nicht um dich zu bewerten, sondern um passende Wege für dich zu finden.
> Es gibt keine falschen Antworten. Auch "weiß ich nicht" ist völlig OK. Nimm dir Zeit und antworte so ehrlich, wie es sich für dich richtig anfühlt.

#### Schritt 1: Geburtsdaten

| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Geburtsdatum | Datumsauswahl | Ja | Format: TT.MM.JJJJ |
| Geburtszeit | Zeitauswahl | Ja | So genau wie möglich. Hinweis: "Falls du deine genaue Geburtszeit nicht kennst, schau im Mutter-Kind-Pass oder auf der Geburtsurkunde nach." |
| Geburtsort | Textfeld mit Autocomplete | Ja | Ortsuche mit Geo-Vervollständigung (z.B. Google Places oder Open Source Alternative) |

#### Schritt 2: Aktuelle Situation

**Frage 2a: "Wo stehst du gerade?" (Pflichtfeld)**

Typ: Single-Select mit Radio Buttons + "Sonstiges"-Freitext

Optionen:
- Angestellt (zufrieden genug)
- Angestellt (will wechseln)
- Selbstständig (läuft nicht wie erhofft)
- Arbeitslos / arbeitssuchend
- Karenz / Auszeit
- In Ausbildung / Umschulung
- Sonstiges: [Freitext]

**Frage 2b: "Höchste abgeschlossene Ausbildung"**

Typ: Dropdown

Optionen:
- Pflichtschule
- Lehre
- Matura
- FH / Uni-Abschluss
- Sonstiges

**Frage 2c: "In welchem Berufsfeld hast du bisher gearbeitet?"**

Typ: Freitext  
Placeholder: "z.B. Einzelhandel, Pflege, Büro/Verwaltung, Handwerk, Gastronomie..."

#### Schritt 3: Was funktioniert – was nicht

**Frage 3a: "Was läuft im Beruf aktuell gut oder fühlt sich richtig an?"**

Typ: Freitext mit Checkbox-Option  
Placeholder: "z.B. Ich mag kreative Aufgaben, arbeite gern selbstständig, der direkte Kontakt mit Menschen liegt mir..."  
Checkbox: ☐ "Weiß ich gerade nicht"  
Verhalten: Bei Aktivierung der Checkbox wird das Textfeld deaktiviert/ausgegraut.

**Frage 3b: "Was frustriert dich oder kostet dich Kraft?"**

Typ: Freitext mit Checkbox-Option  
Placeholder: "z.B. Zu viele Meetings ohne Ergebnis, ständiger Zeitdruck, keine Wertschätzung, monotone Tätigkeiten..."  
Checkbox: ☐ "Weiß ich gerade nicht"

#### Schritt 4: Interessen & Wünsche

**Frage 4a: "Was interessiert dich – auch wenn du es noch nie beruflich gemacht hast?"**

Typ: Freitext mit Checkbox-Option  
Placeholder: "z.B. Menschen beraten, Dinge organisieren, kreativ gestalten, mit den Händen arbeiten, komplexe Probleme lösen..."  
Checkbox: ☐ "Weiß ich gerade nicht"

**Frage 4b: "Wenn Geld keine Rolle spielen würde – womit würdest du deine Zeit verbringen?"**

Typ: Freitext mit Checkbox-Option  
Placeholder: "z.B. Im Garten arbeiten, anderen helfen, etwas aufbauen, lernen, reisen, mich um Familie kümmern..."  
Checkbox: ☐ "Weiß ich gerade nicht"

#### Schritt 5: Bedürfnisse & Abschluss

**Frage 5a: "Was brauchst du jetzt am dringendsten?" (Multiple Choice)**

Typ: Multi-Select (Checkboxen)

Optionen:
- Konkrete Jobideen oder Richtungen
- Klarheit über meine Stärken
- Mut für Veränderung
- Finanzielle Sicherheit
- Erstmal Struktur im Alltag
- Anderes: [Freitext]
- Weiß ich nicht

Verhalten: "Weiß ich nicht" deselektiert alle anderen Optionen und umgekehrt.

**Frage 5b: "Was müsste ich noch wissen, damit wir gut zusammenarbeiten können?" (Optional)**

Typ: Freitext  
Hinweis: "Gibt es etwas, das für deine Situation wichtig ist und das ich wissen sollte? z.B. gesundheitliche Einschränkungen, Betreuungspflichten, regionale Gebundenheit..."

#### Schritt 6: Kontaktdaten & Absenden

| Feld | Typ | Pflicht |
|---|---|---|
| Vorname | Text | Ja |
| Nachname | Text | Ja |
| E-Mail-Adresse | E-Mail | Ja |
| Telefonnummer | Tel | Nein |
| DSGVO-Einwilligung | Checkbox | Ja |

DSGVO-Checkbox-Text: "Ich stimme zu, dass meine Angaben zum Zweck der persönlichen Potenzialanalyse verarbeitet werden. Meine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben. [Datenschutzerklärung lesen]"

Button: **"Fragebogen absenden"**

### 3.2 Erwachsene – Private Veränderung (Platzhalter)

Fragen noch zu definieren. Die Struktur (Schritte, Feldtypen) soll identisch sein. Geburtsdaten und Kontaktdaten bleiben gleich. Nur die inhaltlichen Fragen (Schritte 2–5) werden angepasst.

### 3.3 Schüler:innen + Eltern

**Hinweis:** Es gibt nur eine Variante für diese Zielgruppe (keine Trennung in Schüler:in-Version und Eltern-Version). Der Fragebogen wird aus Elternsicht ausgefüllt, bezieht sich aber auf das Kind/den Jugendlichen.

**Einleitung (wird vor Schritt 1 angezeigt):**

> Dieser Fragebogen hilft mir, dein Kind besser zu verstehen – nicht um es zu bewerten, sondern um passende Wege zu finden.
> Es gibt keine falschen Antworten. Auch "weiß ich nicht" ist völlig OK. Nimm dir Zeit und antworte so ehrlich, wie es sich für dich richtig anfühlt.

#### Schritt 1: Geburtsdaten des Kindes

| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Vorname des Kindes | Text | Ja | Damit die Analyse persönlich formuliert werden kann |
| Geburtsdatum | Datumsauswahl | Ja | Format: TT.MM.JJJJ |
| Geburtszeit | Zeitauswahl | Ja | "Falls du die genaue Geburtszeit nicht kennst, schau im Mutter-Kind-Pass oder auf der Geburtsurkunde nach." |
| Geburtsort | Textfeld mit Autocomplete | Ja | Ortsuche mit Geo-Vervollständigung |

#### Schritt 2: Schulsituation & Fächer

**Frage 2a: "Aktuelle Schulform" (Pflichtfeld)**

Typ: Dropdown (Einzelauswahl)

Optionen:
- Volksschule
- Mittelschule
- Gymnasium (Unterstufe)
- Gymnasium (Oberstufe)
- HTL
- HAK
- HLW
- Andere BHS
- Polytechnische Schule
- Berufsschule
- Andere

**Frage 2b: "Lieblingsfächer" (mehrere möglich)**

Typ: Multi-Select Buttons (Toggle-Chips)

Optionen: Mathematik, Deutsch, Englisch, Physik, Chemie, Biologie, Geschichte, Geographie, Informatik, Wirtschaft, Sport, Kunst/Zeichnen, Musik, Sprachen (andere), Technisches Werken, Textiles Werken

**Frage 2c: "Schwierige Fächer" (mehrere möglich)**

Typ: Multi-Select Buttons (Toggle-Chips)

Optionen: Identisch wie Lieblingsfächer

#### Schritt 3: Lernverhalten & Motivation

**Frage 3a: "Lerntempo"**

Typ: Dropdown

Optionen:
- Schnell
- Mittel
- Langsam/gründlich

**Frage 3b: "Konzentration"**

Typ: Dropdown

Optionen:
- Fällt leicht
- Wechselhaft
- Fällt schwer

**Frage 3c: "Bevorzugter Stil"**

Typ: Dropdown

Optionen:
- Praxis/Hands-on
- Theorie/Lesen
- Beides gleich

**Frage 3d: "Aktuelle Motivation für Schule"**

Typ: Dropdown

Optionen:
- Hoch – lernt gerne
- Mittel – mal so, mal so
- Niedrig – eher unmotiviert

#### Schritt 4: Interessen & Richtung

**Frage 4a: "Interessen & Hobbys" (Pflichtfeld)**

Typ: Freitext (Textarea)  
Placeholder: "z.B. Gaming, Programmieren, Sport, Musik, Tiere, Technik, Kunst, Social Media..."  
Hinweis: "Was macht der/die Jugendliche gerne in der Freizeit? Wofür kann er/sie sich begeistern?"

**Frage 4b: "Druck oder Unsicherheiten" (Optional)**

Typ: Freitext (Textarea)  
Placeholder: "z.B. Eltern erwarten bestimmten Weg, Angst vor falscher Entscheidung, weiß nicht was passt..."  
Hinweis: "Gibt es Druck von außen oder innere Unsicherheiten?"

**Frage 4c: "Tendenz für den weiteren Weg"**

Typ: Dropdown

Optionen:
- Eher weiter Schule (Matura)
- Eher Lehre/Ausbildung
- Noch komplett offen

#### Schritt 5: Kontaktdaten & Absenden

| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Vorname (Elternteil) | Text | Ja | |
| Nachname (Elternteil) | Text | Ja | |
| E-Mail-Adresse | E-Mail | Ja | |
| Telefonnummer | Tel | Nein | |
| DSGVO-Einwilligung | Checkbox | Ja | Besonderer Hinweis auf Daten Minderjähriger |

DSGVO-Checkbox-Text: "Ich stimme als erziehungsberechtigte Person zu, dass die Angaben meines Kindes zum Zweck der persönlichen Potenzialanalyse verarbeitet werden. Die Daten werden vertraulich behandelt und nicht an Dritte weitergegeben. [Datenschutzerklärung lesen]"

Button: **"Fragebogen absenden"**

---

## 4. Nach dem Absenden

### 4.1 Bestätigungsseite

Nach erfolgreichem Absenden sieht der Kunde:

- Bestätigungsnachricht: "Vielen Dank, [Vorname]! Deine Angaben sind bei mir angekommen. Ich melde mich innerhalb von [X] Werktagen bei dir."
- **Terminbuchung:** Prominenter CTA-Button "Jetzt Beratungstermin vereinbaren" → öffnet eingebettetes Calendly-Widget oder leitet zu Calendly-Seite weiter.
- Optional: Kurze Info, was als nächstes passiert ("Ich erstelle ein persönliches Profil und bereite konkrete Empfehlungen vor.")

### 4.2 E-Mail an den Kunden (Bestätigung)

Automatische E-Mail nach Absenden:

**Betreff:** "Danke für deine Angaben – so geht es weiter"

**Inhalt:**
- Persönliche Anrede mit Vorname
- Bestätigung, dass die Angaben eingegangen sind
- Kurze Beschreibung der nächsten Schritte
- Link zur Terminbuchung (Calendly)
- Kontaktmöglichkeit bei Fragen

### 4.3 E-Mail an das Berater-Team (Ergebnisse)

Alle Antworten werden strukturiert an eine oder mehrere konfigurierbare E-Mail-Adressen gesendet.

**Format der Ergebnis-E-Mail:**

- Betreff enthält: Variante (z.B. "Erwachsene – Beruflich" oder "Schüler:in + Eltern"), Name des Kunden, Datum
- Alle Antworten übersichtlich formatiert mit Frage + Antwort
- Geburtsdaten prominent am Anfang (für Profil-Erstellung)
- Kontaktdaten des Kunden
- Angabe, ob Termin gebucht wurde (falls technisch möglich)

---

## 5. Konfigurierbarkeit

Ein zentrales Designprinzip: **Fragen und Antwortmöglichkeiten sollen ohne Programmierkenntnisse änderbar sein.**

### 5.1 Konfigurationsdatei

Alle Fragebogen-Inhalte werden in einer separaten Konfigurationsdatei (z.B. JSON oder YAML) gepflegt, nicht hart im Code. Diese Datei definiert pro Variante:

- Einleitungstext
- Schritte (Steps) mit jeweiligen Fragen
- Pro Frage: Typ (text, single-select, multi-select, dropdown, chips), Optionen, Placeholder, Pflichtfeld ja/nein, "Weiß ich nicht"-Option ja/nein
- Bestätigungstexte

**Beispielstruktur (JSON):**

```json
{
  "variants": {
    "erwachsene-beruflich": {
      "title": "Erwachsene in beruflicher Neuorientierung",
      "intro": "Dieser Fragebogen hilft mir...",
      "steps": [
        {
          "title": "Geburtsdaten",
          "questions": [
            {
              "id": "birth_date",
              "label": "Geburtsdatum",
              "type": "date",
              "required": true
            },
            {
              "id": "birth_time",
              "label": "Geburtszeit",
              "type": "time",
              "required": true,
              "hint": "Falls du deine genaue Geburtszeit nicht kennst..."
            }
          ]
        }
      ]
    },
    "schueler-eltern": {
      "title": "Für Schüler:innen + Eltern",
      "intro": "Dieser Fragebogen hilft mir, dein Kind besser zu verstehen...",
      "steps": [
        {
          "title": "Schulsituation",
          "questions": [
            {
              "id": "school_type",
              "label": "Aktuelle Schulform",
              "type": "dropdown",
              "required": true,
              "options": ["Volksschule", "Mittelschule", "AHS Unterstufe", "..."]
            },
            {
              "id": "favorite_subjects",
              "label": "Lieblingsfächer",
              "type": "chips",
              "multiSelect": true,
              "options": ["Mathematik", "Deutsch", "Englisch", "..."]
            }
          ]
        }
      ]
    }
  }
}
```

### 5.2 Änderbare Einstellungen

| Einstellung | Ort | Beschreibung |
|---|---|---|
| Fragen & Antworten | Konfigurationsdatei | Texte, Optionen, Reihenfolge, Pflichtfelder |
| Empfänger-E-Mail(s) | Umgebungsvariable / Config | Eine oder mehrere Adressen, kommagetrennt |
| Bestätigungstexte | Konfigurationsdatei | E-Mail-Texte, Bestätigungsseite |
| Calendly-URL | Umgebungsvariable / Config | Link zum Buchungskalender |
| Branding | CSS-Variablen | Farben, Logo, Schriftarten (spätere Phase) |
| SMTP-Einstellungen | Umgebungsvariablen | Host, Port, User, Passwort |

---

## 6. Technische Anforderungen

### 6.1 Architektur

**Phase 1 (MVP):** Eigenständige Webanwendung auf dem vorhandenen Webserver.  
**Phase 2 (später):** Integration in myplanb.at als eingebettete Komponente oder Unterseite.

### 6.2 Tech-Stack

| Komponente | Lösung | Begründung |
|---|---|---|
| Frontend | React / Next.js oder einfaches HTML+JS | Multi-Step-Formular, responsives Design, spätere Einbettbarkeit |
| Styling | Tailwind CSS | Flexibel, gut anpassbar, CSS-Variablen für Branding |
| E-Mail-Versand | Eigener SMTP-Server via Nodemailer (o.ä.) | Volle Kontrolle, kein externer Dienstleister, DSGVO-einfacher |
| Hosting | Eigener Webserver (vorhanden) | Keine zusätzlichen Kosten, volle Kontrolle |
| Terminbuchung | Calendly (Embed oder Link) | Schnell einsetzbar, keine eigene Entwicklung nötig |
| Geburtsort-Suche | Google Places Autocomplete oder OpenStreetMap/Nominatim | Autocomplete für Ortsnamen |

### 6.3 E-Mail-Konfiguration

Der E-Mail-Versand erfolgt über einen eigenen SMTP-Server. Folgende Einstellungen werden als Umgebungsvariablen konfiguriert:

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `SMTP_HOST` | SMTP-Server-Adresse | mail.myplanb.at |
| `SMTP_PORT` | Port | 587 |
| `SMTP_USER` | Benutzername | fragebogen@myplanb.at |
| `SMTP_PASS` | Passwort | (geheim) |
| `SMTP_FROM` | Absenderadresse | fragebogen@myplanb.at |
| `RECIPIENT_EMAILS` | Empfänger (kommagetrennt) | beratung@myplanb.at,team@myplanb.at |

### 6.4 Responsiveness

Der Fragebogen muss auf allen Geräten einwandfrei funktionieren:
- Desktop (ab 1024px)
- Tablet (768px–1023px)
- Mobil (unter 768px)

Die Auswahlseite (Cards) wird auf Mobilgeräten untereinander dargestellt. Die Fächer-Chips (Schüler-Variante) wrappen auf kleinen Screens automatisch.

### 6.5 Barrierefreiheit

- Alle Formularfelder mit korrekten Labels
- Keyboard-Navigation möglich
- Ausreichender Farbkontrast
- Fehlermeldungen klar und hilfreich

---

## 7. Datenschutz (DSGVO)

### 7.1 Anforderungen

| Anforderung | Umsetzung |
|---|---|
| Einwilligung | Explizite Checkbox vor Absenden (nicht vorausgefüllt) |
| Einwilligung Minderjährige | Bei Schüler:innen-Variante: Einwilligung durch Erziehungsberechtigte |
| Datenschutzerklärung | Eigene Seite/Modal, verlinkt bei der Checkbox |
| Datenminimierung | Nur notwendige Daten erheben (keine Tracking-Tools ohne Einwilligung) |
| Auskunftsrecht | Kunden können per E-Mail Auskunft/Löschung verlangen |
| Datenspeicherung | Ergebnisse werden per E-Mail übermittelt, keine dauerhafte Speicherung in einer Datenbank (Phase 1) |
| SSL/TLS | Die gesamte Seite muss über HTTPS laufen |
| E-Mail-Transport | SMTP-Verbindung verschlüsselt (STARTTLS oder SSL/TLS) |

### 7.2 Datenschutzerklärung (zu erstellen)

Muss folgende Punkte abdecken:
- Welche Daten erhoben werden und warum
- Rechtsgrundlage (Einwilligung, Art. 6 Abs. 1 lit. a DSGVO)
- Bei Minderjährigen: Hinweis auf Art. 8 DSGVO (Einwilligung der Erziehungsberechtigten)
- Empfänger der Daten (kein externer Auftragsverarbeiter bei eigenem SMTP)
- Speicherdauer
- Rechte der Betroffenen (Auskunft, Löschung, Widerruf)
- Kontaktdaten des Verantwortlichen
- Hinweis auf Geburtsdaten als besonders schützenswerter Datenkategorie

---

## 8. Nicht-funktionale Anforderungen

| Anforderung | Ziel |
|---|---|
| Ladezeit | Erste Seite unter 2 Sekunden |
| Formular-Zwischenspeicherung | Eingaben bleiben erhalten bei Browser-Zurück oder versehentlichem Schließen (Session Storage) |
| Fehlerbehandlung | Bei E-Mail-Versandfehler: Retry + Fallback-Benachrichtigung |
| Analytics | Optional: Abbruchrate pro Schritt messen (nur mit Cookie-Einwilligung) |
| Spam-Schutz | Honeypot-Feld und/oder reCAPTCHA (unsichtbar) beim Absenden |

---

## 9. Design-Richtlinien

### 9.1 Allgemein

- Warmer, einladender Ton – kein klinisches Formular-Gefühl
- Viel Weißraum, nicht überladen
- Orientierung am bestehenden App-Design (dunkle Schrift auf hellem Grund, abgerundete Cards, dezente Akzentfarben)
- Konkrete Branding-Vorgaben (Farben, Logo, Fonts) folgen in Phase 2

### 9.2 Fragebogen-spezifisch

- Fortschrittsbalken oben (z.B. "Schritt 2 von 6")
- "Zurück"-Button auf jedem Schritt (außer Schritt 1)
- Placeholder-Texte als Beispiele in Freitextfeldern
- Hilfetexte unter den Feldern in kleiner, grauer Schrift
- "Weiß ich nicht"-Checkbox optisch klar als Alternative erkennbar, nicht als Fehler
- Fächer-Auswahl als Toggle-Chips (selektierbar/deselektierbar, visuelles Feedback)

### 9.3 UI-Komponenten

| Komponente | Verwendung | Beispiel |
|---|---|---|
| Radio Buttons | Single-Select bei wenigen Optionen | "Wo stehst du gerade?" |
| Dropdown | Single-Select bei vielen Optionen | Schulform, Ausbildung |
| Toggle-Chips | Multi-Select aus fester Liste | Lieblingsfächer, Schwierige Fächer |
| Checkboxen | Multi-Select | "Was brauchst du am dringendsten?" |
| Freitext (Textarea) | Offene Fragen | Interessen, Berufsfeld |
| Freitext + Checkbox | Offene Frage mit "Weiß nicht"-Option | Was funktioniert gut? |

---

## 10. Offene Punkte & nächste Schritte

| Punkt | Status | Verantwortlich |
|---|---|---|
| Fragen für "Private Veränderung" definieren | Offen | CD |
| Calendly-Account einrichten | Offen | CD |
| Branding-Vorgaben festlegen (Farben, Logo, Fonts) | Offen | CD |
| Datenschutzerklärung erstellen lassen | Offen | CD / Jurist |
| Empfänger-E-Mail-Adresse(n) festlegen | Offen | CD |
| SMTP-Zugangsdaten bereitstellen | Offen | CD / IT |
| Bestätigungstexte finalisieren (E-Mail, Seite) | Offen | CD |
| Domain / Subdomain für MVP klären | Offen | CD |
| Geburtsort-API wählen (Google Places vs. OSM) | Offen | Entwicklung |
| Markenrechtliche Prüfung "Human Design" | Offen | CD / Jurist |
| Schulform-Optionen finalisieren (alle relevanten Typen) | Offen | CD |

---

## 11. Erfolgskriterien

| Metrik | Ziel |
|---|---|
| Abschlussrate | > 70% der gestarteten Fragebögen werden abgesendet |
| Zeit bis Absenden | Unter 10 Minuten im Durchschnitt |
| Terminbuchungsrate | > 30% der Absender buchen direkt einen Termin |
| Datenqualität | Geburtsdaten sind vollständig und korrekt formatiert in > 95% der Fälle |
| Mobile Nutzung | Fragebogen ist auf Mobilgeräten ohne Einschränkungen nutzbar |