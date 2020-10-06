"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class TokenValidation {
    static hasClaims(claims, key, value) {
        var foundClaims = claims[key];
        if (foundClaims != null) {
            if (util_1.isArray(foundClaims)) {
                return foundClaims.find(f => f == value);
            }
            return foundClaims == value;
        }
        return false;
    }
}
exports.default = TokenValidation;
//# sourceMappingURL=token-validation.model.js.map