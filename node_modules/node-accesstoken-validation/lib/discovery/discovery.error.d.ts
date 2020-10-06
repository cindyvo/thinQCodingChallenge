export default class DiscoveryError extends Error {
    authority: string;
    description: string;
    errorCode: string;
    constructor(authority: string, description: string, errorCode?: string);
}
