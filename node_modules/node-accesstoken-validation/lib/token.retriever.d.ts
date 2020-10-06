import { SupportedTokens } from './models/supported-tokens.model';
export default class TokenRetriever {
    static Retrieve(authorization: string, scheme?: string): string;
    static FromAuthorizationHeader(request: any, scheme?: string): string;
    static FindType(token: string): SupportedTokens.Jwt | SupportedTokens.Reference;
}
