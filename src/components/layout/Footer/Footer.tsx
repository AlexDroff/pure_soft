// React component 'Footer'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { contacts } from "@/data/contacts";
import { useI18n } from "@/providers/locale-provider";
import styles from "./Footer.module.css";

type SocialItem = {
  label: string;
  href: string;
  icon: string;
};

const socialItems = [
  { label: "YouTube", href: contacts.youtube, icon: "/icons/youtube.svg" },
  {
    label: "Instagram",
    href: contacts.instagram,
    icon: "/icons/instagram.svg",
  },
  { label: "Facebook", href: contacts.facebook, icon: "/icons/facebook.svg" },
].filter((item): item is SocialItem => typeof item.href === "string");

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contacto" className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label={t("footer.brand.logoAriaLabel")}
          >
            <Image
              src="/icons/logo.svg"
              alt={t("footer.brand.logoAlt")}
              width={320}
              height={68}
              className={styles.logo}
            />
          </Link>

          <div className={styles.contactGroup}>
            <address className={styles.addressBlock}>
              <p className={styles.addressLine}>{t("footer.address.line1")}</p>
              <Link href="tel:+34637943520" className={styles.link}>
                {t("footer.address.phone")}
              </Link>
            </address>

            <div
              className={styles.socials}
              aria-label={t("footer.social.groupAriaLabel")}
            >
              {socialItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.socialLink}
                  aria-label={t(
                    `footer.social.${item.label.toLowerCase()}AriaLabel`,
                  )}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.socialIcon}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
