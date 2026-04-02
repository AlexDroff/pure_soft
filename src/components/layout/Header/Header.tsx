// React component 'Header'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
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
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = mobileMenuRef.current
      ? Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            focusableSelector,
          ),
        )
      : [];

    (mobileCloseButtonRef.current || focusableElements[0] || mobileMenuRef.current)?.focus();

    const handleEscapeAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) return;

      const activeFocusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (activeFocusable.length === 0) {
        event.preventDefault();
        mobileMenuRef.current.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscapeAndTrap);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleEscapeAndTrap);
      if (mobileTriggerRef.current?.isConnected) {
        mobileTriggerRef.current.focus();
      }
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

  const handleOpenMobileMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    mobileTriggerRef.current = event.currentTarget;
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
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
                onClick={handleCloseMobileMenu}
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
                onClick={handleOpenMobileMenu}
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
          onClick={handleCloseMobileMenu}
        >
          <div
            id={mobileMenuId}
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu movil"
            className={styles.mobileMenu}
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
          >
            <button
              ref={mobileCloseButtonRef}
              type="button"
              className={styles.mobileCloseButton}
              aria-label="Cerrar menu"
              onClick={handleCloseMobileMenu}
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
