"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { MEDICAL_ACCESS_LOGGER_ABI } from "@/config/contract";
import { MONAD_TESTNET_CHAIN_ID } from "@/config/monad";
import { useContractContext } from "@/context/ContractContext";

export function AccessLogForm() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { contractAddress, notifyLogAdded } = useContractContext();

  const [patientId, setPatientId] = useState("");
  const [reason, setReason] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);
  const [isSuccessDismissed, setIsSuccessDismissed] = useState(false);

  // Wagmi contract write
  const {
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
    writeContractAsync,
  } = useWriteContract();

  // Wagmi transaction receipt wait
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: MONAD_TESTNET_CHAIN_ID,
  });

  const handledTxHashRef = useRef<string | null>(null);

  // Handle successful confirmation exactly once per transaction
  useEffect(() => {
    if (isConfirmed && txHash && handledTxHashRef.current !== txHash) {
      handledTxHashRef.current = txHash;
      // Clear form inputs
      setPatientId("");
      setReason("");
      setValidationError(null);
      setCustomError(null);
      setIsSuccessDismissed(false);

      // Trigger automatic refresh of history and metrics
      notifyLogAdded();
    }
  }, [isConfirmed, txHash, notifyLogAdded]);

  // Handle write / receipt errors
  useEffect(() => {
    if (writeError) {
      const errObj = writeError as unknown as { name?: string; message?: string; shortMessage?: string };
      const msg = errObj.message || "";
      if (
        errObj.name === "UserRejectedRequestError" ||
        msg.toLowerCase().includes("reject") ||
        msg.toLowerCase().includes("denied")
      ) {
        setCustomError("Transaction rejected by user in wallet.");
      } else if (msg.includes("Caller is not an authorized user")) {
        setCustomError("Contract Error: Caller is not an authorized user. Admin must authorize your wallet first.");
      } else if (msg.includes("Patient ID cannot be empty")) {
        setCustomError("Contract Error: Patient ID cannot be empty.");
      } else if (msg.includes("Reason cannot be empty")) {
        setCustomError("Contract Error: Reason cannot be empty.");
      } else {
        setCustomError(errObj.shortMessage || msg || "Transaction failed.");
      }
    } else if (receiptError) {
      setCustomError("Transaction failed during on-chain execution on Monad Testnet.");
    }
  }, [writeError, receiptError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setCustomError(null);
    setIsSuccessDismissed(false);

    // 1. Validate wallet is connected
    if (!isConnected) {
      setValidationError("Wallet is not connected. Please connect your wallet first.");
      return;
    }

    // Validate network
    if (chainId !== MONAD_TESTNET_CHAIN_ID) {
      setValidationError("Wrong network detected. Please switch to Monad Testnet.");
      switchChain({ chainId: MONAD_TESTNET_CHAIN_ID });
      return;
    }

    // 2. Validate Patient ID is not empty
    if (!patientId.trim()) {
      setValidationError("Patient Record ID is required.");
      return;
    }

    // 3. Validate Reason is not empty
    if (!reason.trim()) {
      setValidationError("Reason for access is required.");
      return;
    }

    try {
      resetWrite();
      // 4. Call MedicalAccessLogger.logAccess(patientId, reason)
      await writeContractAsync({
        address: contractAddress,
        abi: MEDICAL_ACCESS_LOGGER_ABI,
        functionName: "logAccess",
        args: [patientId.trim(), reason.trim()],
        chainId: MONAD_TESTNET_CHAIN_ID,
      });
    } catch (err: unknown) {
      // Error is caught and processed by Wagmi's writeError hook
      console.error("logAccess execution error:", err);
    }
  };

  const handleApplyPreset = (pid: string, r: string) => {
    setPatientId(pid);
    setReason(r);
    setValidationError(null);
    setCustomError(null);
  };

  // Determine current transaction state text
  let statusMessage: string | null = null;
  if (isWritePending) {
    statusMessage = "Waiting for wallet confirmation...";
  } else if (isConfirming) {
    statusMessage = "Confirming transaction...";
  } else if (txHash && !isConfirmed && !receiptError) {
    statusMessage = "Transaction submitted...";
  } else if (isConfirmed && !isSuccessDismissed) {
    statusMessage = "Access successfully logged.";
  }

  const isBusy = isWritePending || isConfirming;

  return (
    <section className="panel-card" aria-labelledby="access-record-title" id="log-access-section">
      <div className="card-title-row">
        <h2 id="access-record-title">
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Access Log Entry
        </h2>
        <span
          className="card-badge"
          style={{
            background: isConnected ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
            color: isConnected ? "#6ee7b7" : "#fcd34d",
            borderColor: isConnected ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)",
          }}
        >
          {isConnected ? "Wallet Ready" : "Connect Wallet"}
        </span>
      </div>

      {/* Quick Test Presets specifically requested by user */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
          }}
        >
          Quick Test Presets (Click to autofill)
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className="tag-btn"
            onClick={() => handleApplyPreset("P001", "Emergency Treatment")}
            style={{
              background: "rgba(6, 182, 212, 0.12)",
              borderColor: "rgba(6, 182, 212, 0.35)",
              color: "#38bdf8",
              cursor: "pointer",
            }}
          >
            📋 P001 — Emergency Treatment
          </button>
          <button
            type="button"
            className="tag-btn"
            onClick={() => handleApplyPreset("P001", "Follow-up Consultation")}
            style={{
              background: "rgba(139, 92, 246, 0.12)",
              borderColor: "rgba(139, 92, 246, 0.35)",
              color: "#c084fc",
              cursor: "pointer",
            }}
          >
            📋 P001 — Follow-up Consultation
          </button>
        </div>
      </div>

      {/* Live Transaction State Notifications */}
      {statusMessage && (
        <div
          style={{
            borderRadius: "10px",
            padding: "0.9rem 1.1rem",
            fontSize: "0.86rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            background: isConfirmed
              ? "rgba(16, 185, 129, 0.15)"
              : "rgba(6, 182, 212, 0.15)",
            border: `1px solid ${isConfirmed ? "rgba(16, 185, 129, 0.4)" : "rgba(6, 182, 212, 0.4)"}`,
            color: isConfirmed ? "#6ee7b7" : "#e0f2fe",
            boxShadow: isConfirmed ? "var(--shadow-emerald)" : "var(--shadow-glow)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            {isBusy ? (
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid var(--accent-cyan)",
                  borderTopColor: "transparent",
                  animation: "spin 1s linear infinite",
                  display: "inline-block",
                }}
              />
            ) : (
              <span style={{ fontSize: "1.1rem" }}>✓</span>
            )}
            <div>
              <strong style={{ display: "block" }}>{statusMessage}</strong>
              {txHash && (
                <div style={{ fontSize: "0.76rem", marginTop: "2px", opacity: 0.9 }}>
                  Hash:{" "}
                  <a
                    href={`https://testnet.monadexplorer.com/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#38bdf8", textDecoration: "underline", fontFamily: "var(--font-mono)" }}
                  >
                    {txHash.substring(0, 10)}...{txHash.slice(-8)} ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {isConfirmed && (
            <button
              onClick={() => setIsSuccessDismissed(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "#6ee7b7",
                cursor: "pointer",
                fontSize: "1.1rem",
                padding: "0 0.3rem",
              }}
              aria-label="Dismiss success message"
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Error Banners */}
      {(validationError || customError) && (
        <div
          style={{
            borderRadius: "10px",
            padding: "0.85rem 1rem",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#fca5a5",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>⚠️</span>
            <span>{validationError || customError}</span>
          </div>
          <button
            onClick={() => {
              setValidationError(null);
              setCustomError(null);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#fca5a5",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Access Logging Form */}
      <form className="access-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient-id-input" className="form-label">
            <span>Patient Record ID</span>
            <span className="req">*Required (Off-Chain Reference Only)</span>
          </label>
          <div className="input-container">
            <svg
              className="input-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              id="patient-id-input"
              type="text"
              className="form-input"
              placeholder="e.g. P001"
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
                setValidationError(null);
              }}
              disabled={isBusy}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reason-input" className="form-label">
            <span>Reason for Access</span>
            <span className="req">*Required (Audit Trail Justification)</span>
          </label>
          <div className="input-container">
            <svg
              className="input-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <input
              id="reason-input"
              type="text"
              className="form-input"
              placeholder="e.g. Emergency Treatment"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setValidationError(null);
              }}
              disabled={isBusy}
            />
          </div>
        </div>

        <button
          type="submit"
          id="log-access-btn"
          className="btn-primary"
          disabled={isBusy}
          style={{
            cursor: isBusy ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          {isBusy ? (
            <>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "2px solid #000",
                  borderTopColor: "transparent",
                  animation: "spin 1s linear infinite",
                  display: "inline-block",
                }}
              />
              <span>{isWritePending ? "Waiting for Wallet..." : "Confirming on Monad..."}</span>
            </>
          ) : (
            <span>LOG ACCESS</span>
          )}
        </button>
      </form>
    </section>
  );
}
