"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default({ useClones: false });
class DiscoveryDocumentResponse {
    static getInstance() {
        var instance = myCache.get("DiscoveryDocument");
        if (instance == undefined) {
            instance = new DiscoveryDocumentResponse();
            instance.loaded = false;
            myCache.set("DiscoveryDocument", instance, 600);
        }
        return instance;
    }
    static saveInstance(instance) {
        myCache.set("DiscoveryDocument", instance, 600);
    }
}
exports.default = DiscoveryDocumentResponse;
//# sourceMappingURL=discovery-document-response.js.map