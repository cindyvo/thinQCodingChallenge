export default class InvalidTokenError extends Error {
    authority: string;
    description: string;
    token: string;
    errorCode: string;
    constructor(authority: string, description: string, token: string, errorCode?: string);
}
