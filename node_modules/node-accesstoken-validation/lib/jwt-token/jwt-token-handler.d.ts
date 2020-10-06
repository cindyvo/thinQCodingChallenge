import JwtBearerOptions from './jwt-bearer-options';
export default class JwtTokenHandler {
    options: JwtBearerOptions;
    constructor(options: JwtBearerOptions);
    /**
     * Validate JWT (In fact JWS)
     */
    Handle(token: string): Promise<object>;
    private isSecureScheme;
}
