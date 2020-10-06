"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IntrospectionError extends Error {
    constructor(authority, description, errorCode = "invalid_introspection") {
        super(errorCode);
        this.authority = authority;
        this.description = description;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, IntrospectionError);
    }
}
exports.default = IntrospectionError;
//# sourceMappingURL=introspection.error.js.map