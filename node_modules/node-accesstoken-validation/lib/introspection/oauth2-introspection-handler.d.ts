import OAuth2IntrospectionOptions from './oauth2-introspection-options';
export default class OAuth2IntrospectionHandler {
    options: OAuth2IntrospectionOptions;
    constructor(options: OAuth2IntrospectionOptions);
    Introspect(token: string): Promise<any>;
    private isSecureScheme;
}
