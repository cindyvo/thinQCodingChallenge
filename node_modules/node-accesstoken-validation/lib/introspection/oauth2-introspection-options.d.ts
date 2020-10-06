export default class OAuth2IntrospectionOptions {
    authority: string;
    clientId: string;
    clientSecret: string;
    requireHttpsMetadata: boolean;
    tokenTypeHint: string;
    enableCache: boolean;
    cacheDuration: number;
    constructor(authority: string, clientId: string, clientSecret: string, requireHttpsMetadata?: boolean, tokenTypeHint?: string, enableCache?: boolean, cacheDuration?: number);
}
