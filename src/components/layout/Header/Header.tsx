"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./Header.module.css";

const navItems = [
  { label: "Головна", href: ROUTES.HOME },
  { label: "Послуги", href: ROUTES.SERVICES },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            PURE SOFT
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        styles.navLink,
                        isActive && styles.active,
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
