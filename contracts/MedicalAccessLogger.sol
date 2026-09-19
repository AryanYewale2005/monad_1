// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MedicalAccessLogger
 * @dev Lightweight, hackathon-ready audit trail smart contract for logging medical data access.
 * Designed for deployment on Monad Testnet.
 * 
 * IMPORTANT PRIVACY NOTE:
 * This contract NEVER stores sensitive medical records, diagnoses, prescriptions,
 * or personal health information (PHI) on-chain. It strictly records immutable
 * metadata: who accessed which patient record ID, why, and when.
 */
contract MedicalAccessLogger {
    // Contract administrator (deployer)
    address public immutable admin;

    // Struct representing an audit trail entry for data access
    struct AccessLog {
        address requester;      // Wallet address of the healthcare provider/requester
        string patientId;       // Anonymized/Reference Patient Record ID (NO sensitive data)
        string reason;          // Justification for data access (e.g., "Emergency room consultation")
        uint256 timestamp;      // Block timestamp when access occurred
    }

    // Array storing all access log entries in chronological order
    AccessLog[] private accessLogs;

    // Mapping to track authorized healthcare personnel/systems
    mapping(address => bool) public authorizedUsers;

    // Mapping from patientId to indices in accessLogs array for quick lookups
    mapping(string => uint256[]) private patientLogIndices;

    // --- EVENTS ---

    event AccessLogged(
        address indexed requester,
        string patientId,
        string reason,
        uint256 timestamp
    );

    event UserAuthorized(address indexed user, address indexed admin);
    event UserRevoked(address indexed user, address indexed admin);

    // --- MODIFIERS ---

    modifier onlyAdmin() {
        require(msg.sender == admin, "MedicalAccessLogger: Only admin can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "MedicalAccessLogger: Caller is not an authorized user");
        _;
    }

    /**
     * @dev Constructor sets the deployer as admin and automatically authorizes the admin.
     */
    constructor() {
        admin = msg.sender;
        authorizedUsers[msg.sender] = true;
        emit UserAuthorized(msg.sender, msg.sender);
    }

    // --- ACCESS CONTROL MANAGEMENT ---

    /**
     * @notice Authorizes a healthcare professional or institution wallet to log access.
     * @param _user The address of the user to authorize.
     */
    function authorizeUser(address _user) external onlyAdmin {
        require(_user != address(0), "MedicalAccessLogger: Invalid address");
        require(!authorizedUsers[_user], "MedicalAccessLogger: User is already authorized");

        authorizedUsers[_user] = true;
        emit UserAuthorized(_user, msg.sender);
    }

    /**
     * @notice Revokes access authorization from a user.
     * @param _user The address of the user to revoke.
     */
    function revokeUser(address _user) external onlyAdmin {
        require(_user != address(0), "MedicalAccessLogger: Invalid address");
        require(authorizedUsers[_user], "MedicalAccessLogger: User is not authorized");

        authorizedUsers[_user] = false;
        emit UserRevoked(_user, msg.sender);
    }

    /**
     * @notice Helper to check authorization status of an address.
     * @param _user Address to verify.
     */
    function isAuthorized(address _user) external view returns (bool) {
        return authorizedUsers[_user];
    }

    // --- LOGGING FUNCTIONALITY ---

    /**
     * @notice Logs an access event for a specific patient record reference.
     * @param _patientId Non-sensitive reference ID of the patient record.
     * @param _reason Justification or context for accessing the medical data.
     */
    function logAccess(string calldata _patientId, string calldata _reason) external onlyAuthorized {
        require(bytes(_patientId).length > 0, "MedicalAccessLogger: Patient ID cannot be empty");
        require(bytes(_reason).length > 0, "MedicalAccessLogger: Reason cannot be empty");

        uint256 currentTimestamp = block.timestamp;

        // Store log in array
        accessLogs.push(AccessLog({
            requester: msg.sender,
            patientId: _patientId,
            reason: _reason,
            timestamp: currentTimestamp
        }));

        // Track index for patient-specific lookups
        uint256 logIndex = accessLogs.length - 1;
        patientLogIndices[_patientId].push(logIndex);

        // Emit requested event
        emit AccessLogged(
            msg.sender,
            _patientId,
            _reason,
            currentTimestamp
        );
    }

    // --- RETRIEVAL FUNCTIONS ---

    /**
     * @notice Returns total number of access logs recorded.
     */
    function getLogsCount() external view returns (uint256) {
        return accessLogs.length;
    }

    /**
     * @notice Returns a specific access log by index.
     * @param _index Index in the accessLogs array.
     */
    function getLog(uint256 _index) external view returns (
        address requester,
        string memory patientId,
        string memory reason,
        uint256 timestamp
    ) {
        require(_index < accessLogs.length, "MedicalAccessLogger: Index out of bounds");
        AccessLog storage logEntry = accessLogs[_index];
        return (logEntry.requester, logEntry.patientId, logEntry.reason, logEntry.timestamp);
    }

    /**
     * @notice Returns all access logs recorded so far. Ideal for lightweight hackathon dashboard.
     */
    function getAllLogs() external view returns (AccessLog[] memory) {
        return accessLogs;
    }

    /**
     * @notice Returns all logs associated with a specific patient record ID.
     * @param _patientId Reference ID of the patient.
     */
    function getLogsByPatientId(string calldata _patientId) external view returns (AccessLog[] memory) {
        uint256[] storage indices = patientLogIndices[_patientId];
        uint256 total = indices.length;
        AccessLog[] memory patientLogs = new AccessLog[](total);

        for (uint256 i = 0; i < total; i++) {
            patientLogs[i] = accessLogs[indices[i]];
        }

        return patientLogs;
    }
}
