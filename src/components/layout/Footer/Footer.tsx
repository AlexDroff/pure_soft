import Link from "next/link";
import { Container } from "@/components/layout";
import { SectionText } from "@/components/ui";
import { contacts } from "@/data/contacts";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.brandBlock}>
            <h2 className={styles.logo}>PURE SOFT</h2>
            <SectionText>
              Професійна хімчистка меблів і текстилю з виїздом до клієнта.
            </SectionText>
          </div>

          <div className={styles.contactsBlock}>
            <h3 className={styles.title}>Контакти</h3>

            <ul className={styles.list}>
              <li>
                <Link href={`tel:${contacts.phone}`} className={styles.link}>
                  {contacts.phone}
                </Link>
              </li>

              <li>
                <Link
                  href={`https://wa.me/${formatPhoneNumber(contacts.whatsapp)}`}
                  className={styles.link}
                >
                  WhatsApp
                </Link>
              </li>

              <li>
                <Link href={`mailto:${contacts.email}`} className={styles.link}>
                  {contacts.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <SectionText>© 2026 PURE SOFT. Усі права захищені.</SectionText>
        </div>
      </Container>
    </footer>
  );
}
