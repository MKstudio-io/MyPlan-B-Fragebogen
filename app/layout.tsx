import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-xl font-semibold tracking-tight">
                  myplanb
                </span>
              </a>
              <nav className="flex items-center space-x-6 text-sm">
                <a
                  href="https://www.myplanb.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Zur Hauptseite
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-border/40 py-8 bg-muted/30">
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} myplanb
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <a href="/datenschutz" className="hover:text-foreground transition-colors">
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
