"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import {
  MEDICAL_ACCESS_LOGGER_ADDRESS,
  MEDICAL_ACCESS_LOGGER_ABI,
} from "@/config/contract";
import { MONAD_TESTNET_CHAIN_ID } from "@/config/monad";
import { useContractContext } from "@/context/ContractContext";

export function ContractStatusCard() {
  const { address, isConnected } = useAccount();
  const { contractAddress, setContractAddress, refreshTrigger } = useContractContext();
  const [customAddressInput, setCustomAddressInput] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Auto-refetch when a new log is logged
  useEffect(() => {
    if (refreshTrigger > 0) {
      refetchLogs();
      if (address) refetchAuth();
    }
  }, [refreshTrigger, refetchLogs, refetchAuth, address]);

  // Auto-correct to real deployed contract if set to wallet address or old Remix VM
  useEffect(() => {
    if (
      contractAddress.toLowerCase() === "0x7dab4382fc76280fe2324ddf7ea41cde3a2bf57a" ||
      contractAddress.toLowerCase() === "0xd9145cce52d386f254917e481eb44e9943f39138"
    ) {
      setContractAddress(MEDICAL_ACCESS_LOGGER_ADDRESS);
    }
  }, [contractAddress, setContractAddress]);

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

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel-card" id="blockchain-info-panel">
      {/* Section Title */}
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
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
          Blockchain Information
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
              ? "Invalid Contract Address"
              : "Connecting..."}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Warning banner if address is Remix VM / EOA / 0x bytecode */}
        {isZeroBytecode && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              padding: "0.85rem 1rem",
              fontSize: "0.84rem",
              color: "#fca5a5",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>⚠️</span>
              <span>Address has no contract bytecode on Monad Testnet</span>
            </div>
            <p style={{ color: "#e2e8f0", fontSize: "0.8rem", lineHeight: "1.4" }}>
              {contractAddress.toLowerCase() === "0x7dab4382fc76280fe2324ddf7ea41cde3a2bf57a"
                ? "Target address is currently set to your MetaMask wallet address (EOA) instead of the deployed contract address."
                : "The current address is not a deployed contract on Monad Testnet."}
            </p>
            <button
              type="button"
              onClick={() => {
                setContractAddress(MEDICAL_ACCESS_LOGGER_ADDRESS);
                setIsEditingAddress(false);
              }}
              style={{
                alignSelf: "flex-start",
                padding: "0.45rem 0.8rem",
                borderRadius: "8px",
                background: "var(--accent-cyan)",
                border: "none",
                color: "#000",
                fontWeight: 600,
                fontSize: "0.78rem",
                cursor: "pointer",
              }}
            >
              ✓ Set to Deployed Contract: {MEDICAL_ACCESS_LOGGER_ADDRESS.substring(0, 10)}...
            </button>
          </div>
        )}

        {/* Contract Address Section */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            padding: "0.9rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            style={{
              fontSize: "0.74rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.4rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Contract Address (MedicalAccessLogger)</span>
            <span style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>Monad Testnet</span>
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleApplyCustomAddress} style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
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
                  fontSize: "0.86rem",
                  wordBreak: "break-all",
                }}
              >
                {contractAddress}
              </code>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={copyAddress}
                  title="Copy contract address"
                  style={{
                    fontSize: "0.75rem",
                    color: copied ? "#34d399" : "var(--text-secondary)",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    padding: "0.2rem 0.5rem",
                    cursor: "pointer",
                  }}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
                <a
                  href={`https://testnet.monadexplorer.com/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-highlight)",
                    textDecoration: "none",
                    background: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: "6px",
                    padding: "0.2rem 0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  Explorer ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Key Blockchain Metrics: Network, Contract Address, Number of Records */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {/* Network */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              NETWORK
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a78bfa" }}>
              Monad Testnet
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              Chain ID 10143
            </div>
          </div>

          {/* Number of Access Records */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: "0.75rem",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              NUMBER OF ACCESS RECORDS
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--accent-cyan)",
              }}
            >
              {isLogsLoading ? "..." : isLogsError ? "0" : logsCount !== undefined ? String(logsCount) : "0"}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              Immutable On-Chain
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
              YOUR STATUS
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginTop: "2px" }}>
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
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              {isCallerAdmin ? "Full Permission" : isAuthorized ? "Authorized to Log" : "Read Only"}
            </div>
          </div>
        </div>

        {/* On-Chain Explorer & Source Verification Section */}
        <div
          style={{
            background: "rgba(139, 92, 246, 0.06)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#c084fc", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>🔍</span>
              <span>Monad Testnet Block Explorer</span>
            </span>
            <a
              href={`https://testnet.monadexplorer.com/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.78rem",
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Open Full Explorer Page ↗
            </a>
          </div>

          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: "1.4", margin: 0 }}>
            Every access request recorded here is a permanent, verifiable EVM transaction with cryptographic proof on the Monad blockchain.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
            <a
              href={`https://testnet.monadexplorer.com/address/${contractAddress}#transactions`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.74rem",
                padding: "0.25rem 0.55rem",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              View Contract Transactions ↗
            </a>
            {adminAddress && (
              <a
                href={`https://testnet.monadexplorer.com/address/${adminAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.74rem",
                  padding: "0.25rem 0.55rem",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                }}
              >
                View Admin Wallet ↗
              </a>
            )}
          </div>
        </div>

        {/* Security Notice Reminder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            background: "rgba(6, 182, 212, 0.05)",
            border: "1px solid rgba(6, 182, 212, 0.15)",
            padding: "0.6rem 0.85rem",
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>Protocol:</span>
          <span>Zero PHI on-chain • Real-time EVM event streaming • Sub-second Monad finality</span>
        </div>
      </div>
    </div>
  );
}
