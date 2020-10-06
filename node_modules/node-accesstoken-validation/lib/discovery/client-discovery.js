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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jose_1 = __importStar(require("jose"));
const valid_url_1 = __importDefault(require("valid-url"));
const oidc_constants_1 = __importDefault(require("../introspection/oidc-constants"));
const discovery_document_response_1 = __importDefault(require("./discovery-document-response"));
const discovery_error_1 = __importDefault(require("./discovery.error"));
class ClientDiscovery {
    /**
     * Load discovery document. .well-known
     */
    static loadDiscoveryDocument(authority) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!valid_url_1.default.isUri(authority))
                throw new discovery_error_1.default(authority, "Invalid uri");
            var discoveryDocument = discovery_document_response_1.default.getInstance();
            if (discoveryDocument != undefined && discoveryDocument.loaded)
                return;
            return axios_1.default.get(this.getDiscoveryUrl(authority)).then(response => {
                let instance = response.data;
                let keystore = new jose_1.JWKS.KeyStore();
                instance = Object.assign({ loaded: true, KeySet: keystore }, instance);
                discovery_document_response_1.default.saveInstance(instance);
            });
        });
    }
    /**
     * Load public keys from jwks_uri
     */
    static loadJsonWebKeySet(authority) {
        return __awaiter(this, void 0, void 0, function* () {
            var discoveryDocument = discovery_document_response_1.default.getInstance();
            if (discoveryDocument == undefined || !discoveryDocument.loaded)
                yield this.loadDiscoveryDocument(authority);
            // Reload from cache
            discoveryDocument = discovery_document_response_1.default.getInstance();
            return axios_1.default.get(discoveryDocument.jwks_uri).then(response => {
                const keys = response.data.keys.map(key => jose_1.default.JWK.asKey(key));
                keys.forEach(k => discoveryDocument.KeySet.add(k));
                discovery_document_response_1.default.saveInstance(discoveryDocument);
            });
        });
    }
    static getDiscoveryUrl(authority) {
        let url = this.removeTrailingSlash(authority);
        if (url.endsWith(oidc_constants_1.default.DiscoveryEndpoint)) {
            return authority;
        }
        return `${url}/${oidc_constants_1.default.DiscoveryEndpoint}`;
    }
    static removeTrailingSlash(term) {
        if (term != null && term.endsWith("/"))
            term = term.substring(0, term.length - 1);
        return term;
    }
}
exports.default = ClientDiscovery;
//# sourceMappingURL=client-discovery.js.map