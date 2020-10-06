"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_types_1 = __importDefault(require("./introspection/token-types"));
const supported_tokens_model_1 = require("./models/supported-tokens.model");
class AuthenticationOption {
    constructor(authority, apiName = "", apiSecret = "", supportedTokens = supported_tokens_model_1.SupportedTokens.Both, tokenTypeHint = token_types_1.default.AccessToken, enableCache = false, cacheDuration = 600) {
        this.authority = authority;
        this.apiName = apiName;
        this.apiSecret = apiSecret;
        this.supportedTokens = supportedTokens;
        this.tokenTypeHint = tokenTypeHint;
        this.enableCache = enableCache;
        this.cacheDuration = cacheDuration;
    }
}
exports.default = AuthenticationOption;
//# sourceMappingURL=authentication-options.js.map