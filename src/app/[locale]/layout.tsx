import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import ToasterProvider from "@/shared/components/ToasterProvider";
import { AuthProvider } from "@/shared/provider/authProvider";
import { SerwistProvider } from "@serwist/turbopack/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "IMDb",
  description: "Movies, TV shows, and entertainment discovery platform.",
  icons: [{ rel: "icon", url: "/logo.svg", type: "image/svg+xml" }],
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!["ar", "en"].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
      <html
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        suppressHydrationWarning
        className={`${roboto.variable} h-full antialiased`}
      >
        <head>
          <meta name="theme-color" content="#D4A843" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="apple-touch-icon" href="/appstore-images/ios/192.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/appstore-images/ios/180.png" />
        </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider messages={messages}>
                <SerwistProvider swUrl="/serwist/sw.js">
                  <ToasterProvider />
                  <div className="flex min-h-full flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                </SerwistProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
