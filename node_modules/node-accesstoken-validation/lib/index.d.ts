import AccessTokenHandler from './access-token-handler';
import DiscoveryError from './discovery/discovery.error';
import InvalidTokenError from './errors/invalid-token-error';
import IntrospectionError from './introspection/introspection.error';
import { SupportedTokens } from './models/supported-tokens.model';
declare const _default: {
    AccessTokenHandler: typeof AccessTokenHandler;
    InvalidTokenError: typeof InvalidTokenError;
    DiscoveryError: typeof DiscoveryError;
    IntrospectionError: typeof IntrospectionError;
    SupportedTokens: typeof SupportedTokens;
};
export = _default;
