// React component 'Header'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/layout";
import { LanguageSwitcher, ThemeToggle } from "@/components/ui";
import { useOrderStore } from "@/features/order";
import { useI18n } from "@/providers/locale-provider";
import styles from "./Header.module.css";

export default function Header() {
  const { t } = useI18n();
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

    (
      mobileCloseButtonRef.current ||
      focusableElements[0] ||
      mobileMenuRef.current
    )?.focus();

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
    handleCartClick();
    setIsMobileMenuOpen(false);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    mobileTriggerRef.current = event.currentTarget;
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: "cleaning",
      label: t("header.navigation.items.cleaning"),
      href: "/#limpieza",
    },
    {
      id: "contact",
      label: t("header.navigation.items.contact"),
      href: "/#contacto",
    },
  ];

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label={t("header.brand.logoAriaLabel")}
          >
            <Image
              src="/icons/logo.svg"
              alt="PURE SOFT"
              width={320}
              height={68}
              className={styles.logo}
              priority
            />
          </Link>

          <div className={styles.actions}>
            <nav
              className={styles.nav}
              aria-label={t("header.navigation.ariaLabelDesktop")}
            >
              <ul className={styles.navList}>
                {navItems.map((item) => {
                  const isActive =
                    item.id === "cleaning" && pathname === "/services";

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

            <div className={styles.utilityActions}>
              <button
                type="button"
                className={styles.cartLink}
                aria-label={t("header.cart.openAriaLabel")}
                onClick={handleCartClick}
              >
                <Image
                  src="/icons/cart.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.cartIcon}
                />
              </button>

              <ThemeToggle className={styles.themeToggle} />
              <LanguageSwitcher className={styles.languageSwitcher} />
            </div>

            {isMobileMenuOpen ? (
              <button
                type="button"
                className={styles.burgerButton}
                aria-label={t("header.mobileMenu.closeAriaLabel")}
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
                aria-label={t("header.mobileMenu.openAriaLabel")}
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
        <div className={styles.mobileOverlay} onClick={handleCloseMobileMenu}>
          <div
            id={mobileMenuId}
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("header.mobileMenu.dialogAriaLabel")}
            className={styles.mobileMenu}
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
          >
            <button
              ref={mobileCloseButtonRef}
              type="button"
              className={styles.mobileCloseButton}
              aria-label={t("header.mobileMenu.closeAriaLabel")}
              onClick={handleCloseMobileMenu}
            >
              <IoClose size={24} />
            </button>

            <div className={styles.mobileMenuContent}>
              <nav
                className={styles.mobileNav}
                aria-label={t("header.navigation.ariaLabelMobile")}
              >
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
              </nav>

              <div
                className={styles.mobileActions}
                aria-label={t("header.mobileMenu.actionsAriaLabel")}
              >
                <button
                  type="button"
                  className={styles.mobileCartButton}
                  aria-label={t("header.cart.openAriaLabel")}
                  onClick={handleMobileCartClick}
                >
                  <Image
                    src="/icons/cart.svg"
                    alt=""
                    width={18}
                    height={18}
                    className={styles.mobileCartIcon}
                  />
                </button>
                <ThemeToggle className={styles.mobileThemeToggle} iconSize={16} />
                <LanguageSwitcher className={styles.mobileLanguageSwitcher} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
