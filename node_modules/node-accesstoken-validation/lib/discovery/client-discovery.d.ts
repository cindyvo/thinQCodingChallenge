export default class ClientDiscovery {
    /**
     * Load discovery document. .well-known
     */
    static loadDiscoveryDocument(authority: string): Promise<void>;
    /**
     * Load public keys from jwks_uri
     */
    static loadJsonWebKeySet(authority: string): Promise<void>;
    private static getDiscoveryUrl;
    private static removeTrailingSlash;
}
