"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_types_1 = __importDefault(require("./token-types"));
class OAuth2IntrospectionOptions {
    constructor(authority, clientId, clientSecret, requireHttpsMetadata = true, tokenTypeHint = token_types_1.default.AccessToken, enableCache = false, cacheDuration = 600) {
        this.authority = authority;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.requireHttpsMetadata = requireHttpsMetadata;
        this.tokenTypeHint = tokenTypeHint;
        this.enableCache = enableCache;
        this.cacheDuration = cacheDuration;
        if (clientId === "")
            return;
        if (clientSecret === "")
            throw new Error('clientId must be configured if clientSecret is set.');
    }
}
exports.default = OAuth2IntrospectionOptions;
//# sourceMappingURL=oauth2-introspection-options.js.map