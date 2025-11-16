import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constantes";
import { ThemeProvider } from "next-themes";

const interfont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interfont.className} antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          /* temas */
          themes={["light","dark","cafe","light2","dark2","forest"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
