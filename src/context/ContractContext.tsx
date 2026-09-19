"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MEDICAL_ACCESS_LOGGER_ADDRESS } from "@/config/contract";

interface ContractContextType {
  contractAddress: `0x${string}`;
  setContractAddress: (address: `0x${string}`) => void;
  refreshTrigger: number;
  notifyLogAdded: () => void;
}

const ContractContext = createContext<ContractContextType>({
  contractAddress: MEDICAL_ACCESS_LOGGER_ADDRESS,
  setContractAddress: () => {},
  refreshTrigger: 0,
  notifyLogAdded: () => {},
});

export function ContractProvider({ children }: { children: React.ReactNode }) {
  const [contractAddress, setContractAddressState] = useState<`0x${string}`>(
    MEDICAL_ACCESS_LOGGER_ADDRESS
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Read any saved contract address from localStorage on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("monad_contract_address");
      // If saved address is the old Remix VM address or the deployer wallet address, reset to real contract
      if (
        saved &&
        saved.startsWith("0x") &&
        saved.length === 42 &&
        saved.toLowerCase() !== "0xd9145cce52d386f254917e481eb44e9943f39138" &&
        saved.toLowerCase() !== "0x7dab4382fc76280fe2324ddf7ea41cde3a2bf57a"
      ) {
        setContractAddressState(saved as `0x${string}`);
      } else {
        setContractAddressState(MEDICAL_ACCESS_LOGGER_ADDRESS);
        localStorage.setItem("monad_contract_address", MEDICAL_ACCESS_LOGGER_ADDRESS);
      }
    }
  }, []);

  const setContractAddress = (address: `0x${string}`) => {
    setContractAddressState(address);
    if (typeof window !== "undefined") {
      localStorage.setItem("monad_contract_address", address);
    }
  };

  const notifyLogAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <ContractContext.Provider
      value={{
        contractAddress,
        setContractAddress,
        refreshTrigger,
        notifyLogAdded,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContractContext() {
  return useContext(ContractContext);
}
