import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyara Ivanova-Ilieva | SMM",
  description:
    "Helping brands grow and engage with their audience through creative and data-driven social media strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-dark font-raleway overflow-x-hidden">{children}</body>
    </html>
  );
}
