import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContentDebug from "./components/ContentDebug";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IVI Trasporti | Servizi di Trasporto Nazionali e Internazionali",
  description:
    "Offriamo soluzioni di trasporto su misura per aziende e professionisti, con servizi affidabili e puntuali. Dalle spedizioni nazionali ai trasporti internazionali, accompagniamo ogni consegna con attenzione, flessibilità e un costante supporto al cliente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <html
      lang="it"
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body-md overflow-x-hidden">
        {children}
        {isDev && <ContentDebug />}
      </body>
    </html>
  );
}
