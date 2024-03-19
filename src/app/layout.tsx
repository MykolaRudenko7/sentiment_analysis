import { Montserrat } from 'next/font/google'
import React from 'react'
import type { Metadata } from 'next'
import 'styles/normalize.scss'
import 'styles/reset.scss'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Sentiment Analysis',
    description: 'Sentiment Analysis App with Next.js',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>{children}</body>
        </html>
    )
}
