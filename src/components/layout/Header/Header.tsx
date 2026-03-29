"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/layout";
import { useOrderStore } from "@/features/order";
import styles from "./Header.module.css";

const navItems = [
  { label: "LIMPIEZA", href: "/#limpieza" },
  { label: "FAQ", href: "/#faq" },
  { label: "CONTACTO", href: "/#contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const openSidebar = useOrderStore((state) => state.openSidebar);

  const handleCartClick = () => {
    openSidebar();

    if (pathname !== "/services") {
      router.push("/services");
    }
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logoLink} aria-label="PURE SOFT">
            <Image
              src="/icons/logo.svg"
              alt="PURE SOFT"
              width={320}
              height={68}
              priority
              className={styles.logo}
            />
          </Link>

          <div className={styles.actions}>
            <nav className={styles.nav} aria-label="Primary navigation">
              <ul className={styles.navList}>
                {navItems.map((item) => {
                  const isActive =
                    item.label === "LIMPIEZA" && pathname === "/services";

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

            <button
              type="button"
              className={styles.cartLink}
              aria-label="Abrir carrito"
              onClick={handleCartClick}
            >
              <Image
                src="/icons/cart.svg"
                alt=""
                width={50}
                height={40}
                className={styles.cartIcon}
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
