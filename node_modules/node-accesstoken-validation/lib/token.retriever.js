"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supported_tokens_model_1 = require("./models/supported-tokens.model");
class TokenRetriever {
    static Retrieve(authorization, scheme = "bearer") {
        if (authorization == null || authorization.trim() == "")
            return null;
        if (authorization.toLowerCase().startsWith(scheme))
            return authorization.substring(`${scheme}`.length + 1).trim();
        return null;
    }
    static FromAuthorizationHeader(request, scheme = "bearer") {
        const authorization = request.headers["authorization"].toString().toLower();
        return this.Retrieve(authorization);
    }
    static FindType(token) {
        if (token.includes("."))
            return supported_tokens_model_1.SupportedTokens.Jwt;
        return supported_tokens_model_1.SupportedTokens.Reference;
    }
}
exports.default = TokenRetriever;
//# sourceMappingURL=token.retriever.js.map