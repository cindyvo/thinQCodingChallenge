"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url_1 = __importDefault(require("url"));
const client_discovery_1 = __importDefault(require("../discovery/client-discovery"));
const discovery_document_response_1 = __importDefault(require("../discovery/discovery-document-response"));
const introspection_error_1 = __importDefault(require("./introspection.error"));
class OAuth2IntrospectionHandler {
    constructor(options) {
        this.options = options;
        if (!this.isSecureScheme(this.options.authority)) {
            throw new introspection_error_1.default(options.authority, "HTTPS required");
        }
        if (options.clientId == "" || options.clientSecret == "")
            throw new introspection_error_1.default(options.authority, "Invalid clientId or clientSecret for introspection.");
    }
    Introspect(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_discovery_1.default.loadDiscoveryDocument(this.options.authority);
            const authorizationHeader = `Basic ${Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`).toString('base64')}`;
            const fetchOption = {
                method: 'POST',
                headers: {
                    Authorization: authorizationHeader,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'token-introspection',
                }
            };
            var params = new URLSearchParams();
            params.append('token', token);
            params.append('token_type_hint', this.options.tokenTypeHint);
            var discoveryDocument = discovery_document_response_1.default.getInstance();
            let res;
            try {
                const request = axios_1.default.create(fetchOption);
                res = yield request.post(discoveryDocument.introspection_endpoint, params);
            }
            catch (err) {
                throw new introspection_error_1.default(this.options.authority, 'Remote introspection request failed');
            }
            if (res.status === 200 && res.data.active) {
                return res.data;
            }
            throw new introspection_error_1.default(this.options.authority, 'Token not active');
        });
    }
    /// <summary>
    /// Determines whether uses a secure scheme according to the policy.
    /// </summary>
    isSecureScheme(url) {
        if (this.options.requireHttpsMetadata) {
            var parsedUrl = url_1.default.parse(url);
            return parsedUrl.protocol === "https:";
        }
        return true;
    }
}
exports.default = OAuth2IntrospectionHandler;
//# sourceMappingURL=oauth2-introspection-handler.js.map