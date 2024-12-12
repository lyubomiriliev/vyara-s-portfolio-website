import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en" className="overflow-x-hidden m-0 p-0 font-raleway">
      <body className="overflow-x-hidden m-0 p-0 font-raleway bg-dark">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
