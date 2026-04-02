// React component 'Header'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import { IoClose } from "react-icons/io5";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const handleCartClick = () => {
    openSidebar();

    if (pathname !== "/services") {
      router.push("/services");
    }
  };

  const handleMobileCartClick = () => {
    setIsMobileMenuOpen(false);
    handleCartClick();
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
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

            {isMobileMenuOpen ? (
              <button
                type="button"
                className={styles.burgerButton}
                aria-label="Cerrar menu"
                aria-controls={mobileMenuId}
                aria-expanded="true"
                aria-haspopup="dialog"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <Image
                  src="/icons/burger.svg"
                  alt=""
                  width={28}
                  height={28}
                  className={styles.burgerIcon}
                />
              </button>
            ) : (
              <button
                type="button"
                className={styles.burgerButton}
                aria-label="Abrir menu"
                aria-controls={mobileMenuId}
                aria-expanded="false"
                aria-haspopup="dialog"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <Image
                  src="/icons/burger.svg"
                  alt=""
                  width={28}
                  height={28}
                  className={styles.burgerIcon}
                />
              </button>
            )}
          </div>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            id={mobileMenuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu movil"
            className={styles.mobileMenu}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.mobileCloseButton}
              aria-label="Cerrar menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IoClose size={24} />
            </button>

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.mobileMenuLink}
                  onClick={handleMobileLinkClick}
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                className={styles.mobileCartButton}
                onClick={handleMobileCartClick}
                aria-label="Abrir carrito"
              >
                <Image
                  src="/icons/cart.svg"
                  alt=""
                  width={50}
                  height={40}
                  className={styles.mobileCartIcon}
                />
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
