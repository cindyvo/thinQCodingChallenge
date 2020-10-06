export default class IntrospectionError extends Error {
    authority: string;
    description: string;
    errorCode: string;
    constructor(authority: string, description: string, errorCode?: string);
}
