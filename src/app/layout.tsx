import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "H.Studio",
  description: "H.Studio — full-service creative studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400;1,700&family=Playfair+Display:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
