import type { Metadata } from "next";
import TermsPage from "@/components/pages/TermsPage";

export const metadata: Metadata = {
  title: "Общи условия — Aviva Digital",
  description:
    "Общи условия за ползване на услугите на Aviva Digital — дигитален маркетинг, уеб разработка, AI съдържание и управление на социални мрежи.",
};

export default function Terms() {
  return (
    <main>
      <TermsPage />
    </main>
  );
}
