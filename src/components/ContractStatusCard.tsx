"use client";

import React, { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  MEDICAL_ACCESS_LOGGER_ADDRESS,
  MEDICAL_ACCESS_LOGGER_ABI,
} from "@/config/contract";
import { MONAD_TESTNET_CHAIN_ID } from "@/config/monad";

export function ContractStatusCard() {
  const { address, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState<`0x${string}`>(
    MEDICAL_ACCESS_LOGGER_ADDRESS
  );
  const [customAddressInput, setCustomAddressInput] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Read admin from contract
  const {
    data: adminAddress,
    isLoading: isAdminLoading,
    isError: isAdminError,
    error: adminError,
    refetch: refetchAdmin,
  } = useReadContract({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    functionName: "admin",
    chainId: MONAD_TESTNET_CHAIN_ID,
  });

  // Read total logs count from contract
  const {
    data: logsCount,
    isLoading: isLogsLoading,
    isError: isLogsError,
    refetch: refetchLogs,
  } = useReadContract({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    functionName: "getLogsCount",
    chainId: MONAD_TESTNET_CHAIN_ID,
  });

  // Check if current connected user is authorized
  const {
    data: isAuthorized,
    isLoading: isAuthLoading,
    refetch: refetchAuth,
  } = useReadContract({
    address: contractAddress,
    abi: MEDICAL_ACCESS_LOGGER_ABI,
    functionName: "isAuthorized",
    args: address ? [address] : undefined,
    chainId: MONAD_TESTNET_CHAIN_ID,
    query: {
      enabled: Boolean(address),
    },
  });

  const handleRefresh = () => {
    refetchAdmin();
    refetchLogs();
    if (address) refetchAuth();
  };

  const isContractReachable = Boolean(adminAddress) || logsCount !== undefined;
  const isZeroBytecode =
    isAdminError &&
    (adminError?.message?.includes("0x") ||
      adminError?.message?.includes("returned no data") ||
      adminError?.message?.includes("not a contract"));
  const isCallerAdmin =
    address && adminAddress
      ? address.toLowerCase() === (adminAddress as string).toLowerCase()
      : false;

  const handleApplyCustomAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customAddressInput.trim();
    if (clean.startsWith("0x") && clean.length === 42) {
      setContractAddress(clean as `0x${string}`);
      setIsEditingAddress(false);
      setCustomAddressInput("");
    }
  };

  return (
    <div className="panel-card" id="contract-connection-panel">
      <div className="card-title-row">
        <h2>
          <svg
            className="icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Smart Contract Status
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={handleRefresh}
            title="Refresh on-chain contract state"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              padding: "0.25rem 0.5rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            Sync
          </button>
          <span
            className="card-badge"
            style={{
              background: isContractReachable
                ? "rgba(16, 185, 129, 0.15)"
                : isZeroBytecode
                ? "rgba(239, 68, 68, 0.15)"
                : "rgba(245, 158, 11, 0.15)",
              color: isContractReachable
                ? "#6ee7b7"
                : isZeroBytecode
                ? "#fca5a5"
                : "#fcd34d",
              borderColor: isContractReachable
                ? "rgba(16, 185, 129, 0.3)"
                : isZeroBytecode
                ? "rgba(239, 68, 68, 0.3)"
                : "rgba(245, 158, 11, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: isContractReachable
                  ? "#10b981"
                  : isZeroBytecode
                  ? "#ef4444"
                  : "#f59e0b",
              }}
            />
            {isContractReachable
              ? "Contract Active"
              : isZeroBytecode
              ? "Remix VM / No Bytecode on Testnet"
              : "Checking RPC..."}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Warning banner if address is Remix VM / 0x bytecode */}
        {isZeroBytecode && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              padding: "0.75rem 1rem",
              fontSize: "0.82rem",
              color: "#fca5a5",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>⚠️</span>
              <span>Notice: Deployed address has no bytecode on Monad Testnet</span>
            </div>
            <p style={{ color: "#e2e8f0", fontSize: "0.8rem", lineHeight: "1.4" }}>
              <code>0xd9145CCE...</code> is Remix&apos;s default internal JavaScript VM address. To deploy to the actual Monad Testnet, in Remix select <strong>Environment: Injected Provider - MetaMask</strong> and ensure your wallet is on Monad Testnet (Chain ID 10143).
            </p>
            <button
              onClick={() => setIsEditingAddress(true)}
              style={{
                alignSelf: "flex-start",
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
                fontSize: "0.75rem",
                cursor: "pointer",
                marginTop: "0.2rem",
              }}
            >
              Update Contract Address ✎
            </button>
          </div>
        )}

        {/* Contract Address row */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            padding: "0.85rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.3rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Target Contract Address</span>
            <span>Monad Testnet (10143)</span>
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleApplyCustomAddress} style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem" }}>
              <input
                type="text"
                value={customAddressInput}
                onChange={(e) => setCustomAddressInput(e.target.value)}
                placeholder="0x..."
                style={{
                  flex: 1,
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid var(--accent-cyan)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.6rem",
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "var(--accent-cyan)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                style={{
                  padding: "0.4rem 0.6rem",
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-cyan)",
                  fontSize: "0.88rem",
                  wordBreak: "break-all",
                }}
              >
                {contractAddress}
              </code>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => {
                    setCustomAddressInput(contractAddress);
                    setIsEditingAddress(true);
                  }}
                  title="Change address"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Edit
                </button>
                <a
                  href={`https://testnet.monadexplorer.com/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-highlight)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  View on Explorer ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Contract Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {/* Admin Address */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              CONTRACT ADMIN
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-primary)" }}>
              {isAdminLoading
                ? "Reading on-chain..."
                : isZeroBytecode
                ? "Pending deployment"
                : adminAddress
                ? `${(adminAddress as string).substring(0, 8)}...${(adminAddress as string).substring(
                    (adminAddress as string).length - 6
                  )}`
                : "Not deployed"}
            </div>
          </div>

          {/* On-Chain Log Count */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              ON-CHAIN AUDIT LOGS
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--accent-cyan)",
              }}
            >
              {isLogsLoading ? "..." : isLogsError ? "0" : logsCount !== undefined ? String(logsCount) : "0"}
            </div>
          </div>

          {/* Caller Authorization Status */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              CALLER ROLE
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              {!isConnected ? (
                <span style={{ color: "var(--text-muted)" }}>Wallet Disconnected</span>
              ) : isAuthLoading ? (
                <span style={{ color: "var(--text-secondary)" }}>Verifying...</span>
              ) : isCallerAdmin ? (
                <span style={{ color: "#38bdf8" }}>Deployer & Admin ⭐</span>
              ) : isAuthorized ? (
                <span style={{ color: "#10b981" }}>Authorized Provider ✓</span>
              ) : (
                <span style={{ color: "#f59e0b" }}>Not Authorized ⚠</span>
              )}
            </div>
          </div>
        </div>

        {/* Communication confirmation banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            background: "rgba(6, 182, 212, 0.06)",
            border: "1px solid rgba(6, 182, 212, 0.15)",
            padding: "0.6rem 0.85rem",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>RPC Link:</span>
          <span>Next.js ⇄ Viem / Wagmi ⇄ Monad Testnet (Chain ID 10143) ⇄ MedicalAccessLogger</span>
        </div>
      </div>
    </div>
  );
}
