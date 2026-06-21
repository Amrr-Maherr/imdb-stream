"use client";

import { useTranslations } from "next-intl";
import FooterColumn from "./FooterColumn";

export default function FooterLinks() {
  const t = useTranslations("Footer");

  const columns = [
    {
      title: t("about"),
      links: [
        { href: "/about", label: t("aboutLinks.about") },
        { href: "/careers", label: t("aboutLinks.careers") },
        { href: "/press", label: t("aboutLinks.press") },
      ],
    },
    {
      title: t("help"),
      links: [
        { href: "/faq", label: t("helpLinks.faq") },
        { href: "/contact", label: t("helpLinks.contact") },
        { href: "/feedback", label: t("helpLinks.feedback") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/terms", label: t("legalLinks.terms") },
        { href: "/privacy", label: t("legalLinks.privacy") },
        { href: "/cookies", label: t("legalLinks.cookies") },
      ],
    },
    {
      title: t("social"),
      links: [
        { href: "https://facebook.com", label: t("socialLinks.facebook") },
        { href: "https://twitter.com", label: t("socialLinks.twitter") },
        { href: "https://instagram.com", label: t("socialLinks.instagram") },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {columns.map((col) => (
        <FooterColumn key={col.title} title={col.title} links={col.links} />
      ))}
    </div>
  );
}
