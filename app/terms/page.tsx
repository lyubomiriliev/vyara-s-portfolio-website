import type { Metadata } from "next";
import TermsPage from "@/components/pages/TermsPage";

export const metadata: Metadata = {
  title: "Общи условия — Aviva Digital",
  description:
    "Общи условия за ползване на услугите на Aviva Digital — дигитален маркетинг, уеб разработка, AI съдържание и управление на социални мрежи. Terms of service for Aviva Digital.",
  alternates: {
    canonical: "https://avivadigital.bg/terms",
  },
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <main>
      <TermsPage />
    </main>
  );
}
