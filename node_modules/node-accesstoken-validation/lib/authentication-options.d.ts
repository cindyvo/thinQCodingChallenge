import { SupportedTokens } from './models/supported-tokens.model';
export default class AuthenticationOption {
    authority: string;
    apiName: string;
    apiSecret: string;
    supportedTokens: SupportedTokens;
    tokenTypeHint: string;
    enableCache: boolean;
    cacheDuration: number;
    constructor(authority: string, apiName?: string, apiSecret?: string, supportedTokens?: SupportedTokens, tokenTypeHint?: string, enableCache?: boolean, cacheDuration?: number);
}
