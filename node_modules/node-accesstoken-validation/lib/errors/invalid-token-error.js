"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidTokenError extends Error {
    constructor(authority, description, token, errorCode = "invalid_token") {
        super(errorCode);
        this.authority = authority;
        this.description = description;
        this.token = token;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, InvalidTokenError);
    }
}
exports.default = InvalidTokenError;
//# sourceMappingURL=invalid-token-error.js.map