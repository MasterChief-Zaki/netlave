"use client";

import { useState } from "react";
import styles from "./SiteHeader.module.scss";

const navigation = [
  { href: "#idea", label: "The idea" },
  { href: "#system", label: "The system" },
  { href: "#twin", label: "Digital twin" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#home" aria-label="NetLave home">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M6 25V7l20 18V7M6 16l10-6 10 6M6 25l10-6 10 6" />
          </svg>
          NetLave<span className={styles.wordmarkDot}>.</span>
        </a>
        <nav className={styles.desktopNavigation} aria-label="Primary">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.headerAction} href="#twin">
          Explore the twin <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className={styles.mobileNavigation}
            aria-label="Mobile"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a
              href="#next"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              What comes next<span aria-hidden="true">↗</span>
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
