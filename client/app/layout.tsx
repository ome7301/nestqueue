import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NestQueue",
  description: "In-house solution to manage IT tickets for the WIT pathway.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
