"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscoveryError extends Error {
    constructor(authority, description, errorCode = "invalid_discovery") {
        super(errorCode);
        this.authority = authority;
        this.description = description;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, DiscoveryError);
    }
}
exports.default = DiscoveryError;
//# sourceMappingURL=discovery.error.js.map