"use client";

import React from "react";
import { useContractContext } from "@/context/ContractContext";

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToAbout?: () => void;
}

export function LandingPage({ onNavigateToDashboard, onNavigateToAbout }: LandingPageProps) {
  const { contractAddress } = useContractContext();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(14, 21, 37, 0.85) 0%, rgba(7, 10, 19, 0.95) 100%)",
          border: "1px solid rgba(56, 189, 248, 0.2)",
          borderRadius: "24px",
          padding: "3.5rem 2rem",
          overflow: "hidden",
          boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.7), var(--shadow-glow)",
          textAlign: "center",
        }}
      >
        {/* Glow ambient background element */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "350px",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              background: "rgba(6, 182, 212, 0.12)",
              border: "1px solid rgba(6, 182, 212, 0.35)",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#38bdf8",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "var(--accent-cyan)",
                boxShadow: "0 0 10px var(--accent-cyan)",
              }}
            />
            Powered by Monad High-Throughput Blockchain
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              background: "linear-gradient(135deg, #ffffff 40%, #7dd3fc 80%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Transparent & Tamper-Resistant Medical Data Access Auditing
          </h1>

          {/* Problem & Solution Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "760px",
              margin: "0 auto 2.25rem",
            }}
          >
            Traditional centralized audit logs can be altered, deleted, or hidden from patients.{" "}
            <strong style={{ color: "#f1f5f9" }}>MedAccess</strong> uses Solidity and the sub-second finality of the{" "}
            <strong style={{ color: "#38bdf8" }}>Monad Testnet</strong> to record immutable access proofs—while sensitive medical records remain 100% securely off-chain.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onNavigateToDashboard}
              className="btn-primary"
              style={{
                padding: "0.95rem 2rem",
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
                cursor: "pointer",
              }}
            >
              <span>Launch Audit Dashboard</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href={`https://testnet.monadexplorer.com/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wallet"
              style={{
                padding: "0.95rem 1.6rem",
                fontSize: "0.95rem",
                borderRadius: "12px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>View On Monad Explorer ↗</span>
            </a>

            {onNavigateToAbout && (
              <button
                onClick={onNavigateToAbout}
                className="btn-wallet"
                style={{
                  padding: "0.95rem 1.6rem",
                  fontSize: "0.95rem",
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  background: "rgba(139, 92, 246, 0.12)",
                  borderColor: "rgba(139, 92, 246, 0.35)",
                  color: "#c084fc",
                }}
              >
                <span>Team & Vision 💡</span>
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem",
              marginTop: "3rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#34d399", fontFamily: "var(--font-mono)" }}>
                0 PHI
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                Zero Health Info On-Chain
              </div>
            </div>

            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#38bdf8", fontFamily: "var(--font-mono)" }}>
                10,000+
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                TPS Throughput on Monad
              </div>
            </div>

            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a78bfa", fontFamily: "var(--font-mono)" }}>
                &lt; 1 sec
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                Sub-Second Finality
              </div>
            </div>

            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f59e0b", fontFamily: "var(--font-mono)" }}>
                100%
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                Immutable & Verifiable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 700, color: "#f8fafc" }}>
            The Core Healthcare Challenge & Our Blockchain Solution
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            Solving centralized vulnerability without compromising patient confidentiality.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {/* Problem Card */}
          <div
            style={{
              background: "rgba(239, 68, 68, 0.04)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "18px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#f87171",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                }}
              >
                ✕
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fca5a5" }}>
                  Traditional Centralized Audit Logs
                </h3>
                <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>Current Hospital Model</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", padding: 0 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span><strong>Vulnerable to Insider Modification:</strong> Database admins or compromised credentials can delete access history undetected.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span><strong>Zero Patient Transparency:</strong> Patients cannot independently verify who viewed their prescriptions or diagnostic tests.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span><strong>Siloed Regulatory Auditing:</strong> External compliance audits require complex data requests prone to omission.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div
            style={{
              background: "rgba(16, 185, 129, 0.04)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "18px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "var(--shadow-emerald)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                }}
              >
                ✓
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#6ee7b7" }}>
                  MedAccess on Monad Blockchain
                </h3>
                <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>Decentralized Architecture</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", padding: 0 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>•</span>
                <span><strong>Immutable Consensus:</strong> Every access entry is cryptographically sealed by Monad nodes and cannot be overwritten.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#e2e8f0" }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>•</span>
                <span><strong>Strict Off-Chain Privacy:</strong> Only reference IDs (`P001`), reasons, and requester wallets are logged. No medical data touches the chain.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.88rem", color: "#10b981", fontWeight: 500 }}>
                <span>•</span>
                <span><strong>Sub-Second Monad Performance:</strong> Hospital staff can log thousands of accesses daily with zero latency or network congestion.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3-Step Workflow Section */}
      <section
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.65rem", fontWeight: 700, color: "#f8fafc" }}>
            How the Protocol Operates
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem" }}>
            End-to-end cryptographic verification in 3 lightweight steps.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(6, 182, 212, 0.15)",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Off-Chain Data Request
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              A healthcare worker accesses medical records (e.g. EHR database) securely off-chain in the hospital network.
            </p>
          </div>

          {/* Step 2 */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(139, 92, 246, 0.15)",
                color: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>
              logAccess() Smart Contract
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Authorized provider signs a transaction logging the reference ID (e.g. <code>P001</code>) and access justification.
            </p>
          </div>

          {/* Step 3 */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "14px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Immutable Monad Block
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Within 400ms, the log is permanently etched onto Monad Testnet, triggering an <code>AccessLogged</code> event.
            </p>
          </div>
        </div>
      </section>

      {/* Security Guarantee Box */}
      <div
        style={{
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "16px",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: "700px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(16, 185, 129, 0.2)",
              color: "#34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            🛡️
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9" }}>
              Guaranteed Zero Protected Health Information (PHI) On-Chain
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#a7f3d0", marginTop: "0.25rem", lineHeight: 1.5 }}>
              Medical records remain securely off-chain. Only access metadata is recorded on the blockchain.
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToDashboard}
          style={{
            padding: "0.75rem 1.4rem",
            background: "var(--accent-emerald)",
            border: "none",
            borderRadius: "10px",
            color: "#000",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            boxShadow: "var(--shadow-emerald)",
          }}
        >
          Open Audit Dashboard →
        </button>
      </div>
    </div>
  );
}
