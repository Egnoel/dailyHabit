import type { Metadata } from 'next'
import { Dosis, Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const dosis = Dosis({ subsets: ['latin'], variable:"--font-dosis" })
const inter = Inter({ subsets: ['latin'], variable:"--font-inter" })

export const metadata: Metadata = {
  title: 'Meta diaria - gerenciador de hábitos',
  description: 'Gerencie seus hábitos de forma simples e rápida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dosis.variable} ${inter.variable} flex items-center flex-col mt-10 bg-neutral-900`}>
        <Image src="/images/logo.svg" alt={'Logo'} width={200} height={200} />
        {children}
        </body>
    </html>
  )
}
