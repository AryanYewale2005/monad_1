"use client";

import React from "react";
import { WalletButton } from "@/components/WalletButton";

interface NavbarProps {
  activeTab: "home" | "dashboard" | "about";
  setActiveTab: (tab: "home" | "dashboard" | "about") => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="app-header" style={{ marginBottom: "1.5rem" }}>
      {/* Brand Section */}
      <div
        className="header-brand"
        onClick={() => setActiveTab("home")}
        style={{ cursor: "pointer" }}
      >
        <div className="brand-icon-wrapper" aria-hidden="true">
          {/* Medical Shield Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
        </div>
        <div className="brand-titles">
          <h1 style={{ fontSize: "1.4rem", margin: 0 }}>
            MedAccess
            <span className="badge-chain">
              <span className="pulse-dot"></span>
              Monad Testnet
            </span>
          </h1>
          <p className="subtitle" style={{ fontSize: "0.82rem", margin: 0 }}>
            Medical Data Access Logger
          </p>
        </div>
      </div>

      {/* Navigation Switcher Pills */}
      <nav
        aria-label="Main Navigation"
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.35)",
          padding: "0.3rem",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          gap: "0.3rem",
        }}
      >
        <button
          onClick={() => setActiveTab("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.55rem 1.15rem",
            borderRadius: "9px",
            fontSize: "0.88rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background:
              activeTab === "home"
                ? "linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25))"
                : "transparent",
            color: activeTab === "home" ? "#38bdf8" : "var(--text-secondary)",
            boxShadow:
              activeTab === "home"
                ? "0 0 15px rgba(6, 182, 212, 0.2), inset 0 0 0 1px rgba(6, 182, 212, 0.4)"
                : "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </button>

        <button
          onClick={() => setActiveTab("dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.55rem 1.15rem",
            borderRadius: "9px",
            fontSize: "0.88rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background:
              activeTab === "dashboard"
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))"
                : "transparent",
            color: activeTab === "dashboard" ? "#34d399" : "var(--text-secondary)",
            boxShadow:
              activeTab === "dashboard"
                ? "0 0 15px rgba(16, 185, 129, 0.2), inset 0 0 0 1px rgba(16, 185, 129, 0.4)"
                : "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("about")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.55rem 1.15rem",
            borderRadius: "9px",
            fontSize: "0.88rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background:
              activeTab === "about"
                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.25))"
                : "transparent",
            color: activeTab === "about" ? "#c084fc" : "var(--text-secondary)",
            boxShadow:
              activeTab === "about"
                ? "0 0 15px rgba(139, 92, 246, 0.2), inset 0 0 0 1px rgba(139, 92, 246, 0.4)"
                : "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          About
        </button>
      </nav>

      {/* Wallet Actions */}
      <div className="header-actions">
        <WalletButton />
      </div>
    </header>
  );
}
