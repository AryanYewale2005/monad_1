"use client";

import React from "react";

interface TeamMember {
  name: string;
  role: string;
  github: string;
  username: string;
  seed: string;
  bio: string;
  skills: string[];
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Chandan Mohanty",
    role: "Smart Contract Architect & Security Lead",
    github: "https://github.com/ChandanCodes18",
    username: "ChandanCodes18",
    seed: "ChandanMohanty",
    bio: "Focused on zero-PHI audit architecture, immutable access control mechanisms, and gas-efficient Solidity contract execution on Monad Testnet.",
    skills: ["Solidity", "Smart Contract Security", "Monad EVM", "HIPAA Cryptography"],
  },
  {
    name: "Aryan Yewale",
    role: "Full-Stack Web3 Engineer & Monad Integration",
    github: "https://github.com/AryanYewale2005",
    username: "AryanYewale2005",
    seed: "AryanYewale",
    bio: "Specializing in Next.js, Wagmi & Viem client integrations, reactive blockchain event subscriptions, and transaction lifecycle management.",
    skills: ["Next.js 16", "Viem / Wagmi", "TypeScript", "EVM State Systems"],
  },
  {
    name: "Ramkrushna Sahu",
    role: "Frontend & UX Specialist",
    github: "https://github.com/Ramkrushna-Sahu/",
    username: "Ramkrushna-Sahu",
    seed: "RamkrushnaSahu",
    bio: "Crafting intuitive, accessible healthcare dashboards with glassmorphism design, real-time audit indicators, and seamless wallet experiences.",
    skills: ["Design Systems", "Component Architecture", "Tailored CSS", "Web3 UX"],
  },
];

export function AboutPage({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Header Banner */}
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
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "350px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#c084fc",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <span>💡</span>
            <span>About MedAccess Protocol</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
              background: "linear-gradient(135deg, #ffffff 40%, #c084fc 80%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Reimagining Healthcare Accountability on the Blockchain
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            Built by a passionate Web3 engineering team during the Monad Blitz hackathon to bridge the gap between institutional medical records security and cryptographic patient transparency.
          </p>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Vision Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(14, 21, 37, 0.7))",
            border: "1px solid rgba(6, 182, 212, 0.25)",
            borderRadius: "20px",
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.15)",
                color: "var(--accent-cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              👁️
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#f8fafc" }}>
                Our Vision
              </h2>
              <span style={{ fontSize: "0.78rem", color: "var(--text-highlight)", fontWeight: 600 }}>
                PATIENT-CENTRIC INTEGRITY
              </span>
            </div>
          </div>

          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            To create a global healthcare standard where patient data confidentiality and institutional auditability reinforce each other. We envision a future where unauthorized medical record access is impossible to conceal, restoring patient trust while protecting healthcare providers with cryptographically verifiable compliance proofs.
          </p>

          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "var(--accent-cyan)" }}>✦</span>
            <span>Empowering over 1 billion patients with unalterable access visibility</span>
          </div>
        </div>

        {/* Mission Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(14, 21, 37, 0.7))",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: "20px",
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "var(--shadow-emerald)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              🎯
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#f8fafc" }}>
                Our Mission
              </h2>
              <span style={{ fontSize: "0.78rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
                EVM-POWERED AUDIT TRAILS
              </span>
            </div>
          </div>

          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
            To eliminate vulnerabilities in centralized hospital audit databases by deploying lightweight, immutable access metadata onto the high-throughput Monad blockchain. By keeping raw records 100% off-chain and recording only non-sensitive access references with sub-second finality, we deliver zero-overhead compliance without privacy risk.
          </p>

          <div
            style={{
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "var(--accent-emerald)" }}>✦</span>
            <span>Zero Protected Health Information (PHI) stored on-chain</span>
          </div>
        </div>
      </section>

      {/* Developers & Team Section */}
      <section>
        <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              color: "var(--accent-cyan)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            <span>ENGINEERING TEAM</span>
          </div>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 700, color: "#f8fafc" }}>
            Meet the Developers
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginTop: "0.4rem" }}>
            The creators and architects behind MedAccess on Monad Testnet.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TEAM_MEMBERS.map((member) => {
            // Dynamic avatar fetching based on name/username
            const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}&backgroundColor=0e1525`;
            const githubAvatarUrl = `https://github.com/${member.username}.png`;

            return (
              <div
                key={member.name}
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "18px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "1.25rem",
                  transition: "all 0.25s ease",
                  boxShadow: "var(--shadow-card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Dynamic Avatar Container */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "88px",
                      height: "88px",
                      borderRadius: "50%",
                      padding: "3px",
                      background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={githubAvatarUrl}
                      alt={member.name}
                      onError={(e) => {
                        // Fallback to stylized name-based avatar if GitHub avatar fails to load
                        (e.currentTarget as HTMLImageElement).src = avatarUrl;
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        backgroundColor: "#0b1120",
                      }}
                    />
                  </div>

                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 2,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#10b981",
                      border: "2px solid #070a13",
                    }}
                    title="Active Developer"
                  />
                </div>

                {/* Name & Role */}
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                    {member.name}
                  </h3>
                  {/* <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--accent-cyan)",
                      fontWeight: 600,
                      marginTop: "0.3rem",
                      padding: "0.2rem 0.6rem",
                      background: "rgba(6, 182, 212, 0.1)",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    {member.role}
                  </div> */}
                </div>

                {/* Bio */}
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
                  {member.bio}
                </p>

                {/* Skill Chips */}
                {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "0.72rem",
                        padding: "0.2rem 0.5rem",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "6px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div> */}

                {/* GitHub Button */}
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "auto",
                    width: "100%",
                    padding: "0.65rem 1rem",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>@{member.username} ↗</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          borderRadius: "18px",
          padding: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
            Ready to test the live Monad access logger?
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.3rem", margin: 0 }}>
            Connect your MetaMask wallet on Monad Testnet and record your first immutable audit entry.
          </p>
        </div>

        <button
          onClick={onNavigateToDashboard}
          className="btn-primary"
          style={{
            padding: "0.85rem 1.6rem",
            fontSize: "0.92rem",
            fontWeight: 700,
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Launch Audit Dashboard →
        </button>
      </div>
    </div>
  );
}
