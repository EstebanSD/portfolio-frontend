import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { languages } from '@/lib/i18n/settings';
import './globals.css';
import { ThemeProvider } from '@/components/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const metadata: Metadata = {
  title: 'Esteban S.D. | Fullstack Developer Portfolio',
  description:
    'Explore my work, skills, and experience as a frontend developer. Built with Next.js, TailwindCSS, and a passion for elegant UI.',
  keywords: [
    'Esteban',
    'Fullstack Developer',
    'Web Developer',
    'Next.js Portfolio',
    'React Developer',
    'JavaScript',
    'TypeScript',
    'TailwindCSS',
    'NestJS',
    'Node.js',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Esteban S.D.', url: baseUrl }],
  creator: 'Esteban S.D.',
  openGraph: {
    title: 'Esteban S.D. | Fullstack Developer Portfolio',
    description:
      'A personal portfolio showcasing projects, skills, and experience in web software development.',
    url: baseUrl,
    siteName: 'Esteban S.D. Portfolio',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Esteban S.D. Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(baseUrl),
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
