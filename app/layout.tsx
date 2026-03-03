import type { Metadata } from 'next'
import Image from 'next/image'
import { Source_Sans_3, Lora } from 'next/font/google'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'myplanb – Persönliche Potenzialanalyse',
  description: 'Fragebogen für deine persönliche Potenzialanalyse durch myplanb.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${sourceSans.variable} ${lora.variable} font-sans`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary text-primary-foreground shadow-[0_2px_20px_rgba(21,90,102,0.3)]">
            <div className="container flex h-16 items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <Image
                  src="/Logo_PlanB_ohneText_white_transparent.png"
                  alt="MyPlanB"
                  width={83}
                  height={40}
                  priority
                />
              </a>
              <nav className="flex items-center space-x-6 text-sm">
                <a
                  href="https://www.myplanb.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Zur Hauptseite
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="py-8 bg-petrol-dark text-white/70">
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">
                  &copy; {new Date().getFullYear()} myplanb
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <a href="/datenschutz" className="hover:text-white transition-colors">
                    Datenschutz
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
