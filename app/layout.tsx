import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amar Jawan Ride",
  description:
    "The Amar Jawan Ride — India's motorcycle fundraiser for the families of our martyred heroes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
