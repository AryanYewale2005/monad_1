export const MEDICAL_ACCESS_LOGGER_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138" as const;

export const MEDICAL_ACCESS_LOGGER_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "patientId",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "AccessLogged",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "authorizeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string"
      }
    ],
    name: "logAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "revokeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "UserAuthorized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "UserRevoked",
    type: "event"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "authorizedUsers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllLogs",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "requester",
            type: "address"
          },
          {
            internalType: "string",
            name: "patientId",
            type: "string"
          },
          {
            internalType: "string",
            name: "reason",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        internalType: "struct MedicalAccessLogger.AccessLog[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256"
      }
    ],
    name: "getLog",
    outputs: [
      {
        internalType: "address",
        name: "requester",
        type: "address"
      },
      {
        internalType: "string",
        name: "patientId",
        type: "string"
      },
      {
        internalType: "string",
        name: "reason",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_patientId",
        type: "string"
      }
    ],
    name: "getLogsByPatientId",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "requester",
            type: "address"
          },
          {
            internalType: "string",
            name: "patientId",
            type: "string"
          },
          {
            internalType: "string",
            name: "reason",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        internalType: "struct MedicalAccessLogger.AccessLog[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getLogsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "isAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;
