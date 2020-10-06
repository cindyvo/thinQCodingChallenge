"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OidcConstants {
}
exports.default = OidcConstants;
OidcConstants.Issuer = "issuer";
// endpoints
OidcConstants.AuthorizationEndpoint = "authorization_endpoint";
OidcConstants.DeviceAuthorizationEndpoint = "device_authorization_endpoint";
OidcConstants.TokenEndpoint = "token_endpoint";
OidcConstants.UserInfoEndpoint = "userinfo_endpoint";
OidcConstants.IntrospectionEndpoint = "introspection_endpoint";
OidcConstants.RevocationEndpoint = "revocation_endpoint";
OidcConstants.DiscoveryEndpoint = ".well-known/openid-configuration";
OidcConstants.JwksUri = "jwks_uri";
OidcConstants.EndSessionEndpoint = "end_session_endpoint";
OidcConstants.CheckSessionIframe = "check_session_iframe";
OidcConstants.RegistrationEndpoint = "registration_endpoint";
OidcConstants.MtlsEndpointAliases = "mtls_endpoint_aliases";
// common capabilities
OidcConstants.FrontChannelLogoutSupported = "frontchannel_logout_supported";
OidcConstants.FrontChannelLogoutSessionSupported = "frontchannel_logout_session_supported";
OidcConstants.BackChannelLogoutSupported = "backchannel_logout_supported";
OidcConstants.BackChannelLogoutSessionSupported = "backchannel_logout_session_supported";
OidcConstants.GrantTypesSupported = "grant_types_supported";
OidcConstants.CodeChallengeMethodsSupported = "code_challenge_methods_supported";
OidcConstants.ScopesSupported = "scopes_supported";
OidcConstants.SubjectTypesSupported = "subject_types_supported";
OidcConstants.ResponseModesSupported = "response_modes_supported";
OidcConstants.ResponseTypesSupported = "response_types_supported";
OidcConstants.ClaimsSupported = "claims_supported";
OidcConstants.TokenEndpointAuthenticationMethodsSupported = "token_endpoint_auth_methods_supported";
// more capabilities
OidcConstants.ClaimsLocalesSupported = "claims_locales_supported";
OidcConstants.ClaimsParameterSupported = "claims_parameter_supported";
OidcConstants.ClaimTypesSupported = "claim_types_supported";
OidcConstants.DisplayValuesSupported = "display_values_supported";
OidcConstants.AcrValuesSupported = "acr_values_supported";
OidcConstants.IdTokenEncryptionAlgorithmsSupported = "id_token_encryption_alg_values_supported";
OidcConstants.IdTokenEncryptionEncValuesSupported = "id_token_encryption_enc_values_supported";
OidcConstants.IdTokenSigningAlgorithmsSupported = "id_token_signing_alg_values_supported";
OidcConstants.OpPolicyUri = "op_policy_uri";
OidcConstants.OpTosUri = "op_tos_uri";
OidcConstants.RequestObjectEncryptionAlgorithmsSupported = "request_object_encryption_alg_values_supported";
OidcConstants.RequestObjectEncryptionEncValuesSupported = "request_object_encryption_enc_values_supported";
OidcConstants.RequestObjectSigningAlgorithmsSupported = "request_object_signing_alg_values_supported";
OidcConstants.RequestParameterSupported = "request_parameter_supported";
OidcConstants.RequestUriParameterSupported = "request_uri_parameter_supported";
OidcConstants.RequireRequestUriRegistration = "require_request_uri_registration";
OidcConstants.ServiceDocumentation = "service_documentation";
OidcConstants.TokenEndpointAuthSigningAlgorithmsSupported = "token_endpoint_auth_signing_alg_values_supported";
OidcConstants.UILocalesSupported = "ui_locales_supported";
OidcConstants.UserInfoEncryptionAlgorithmsSupported = "userinfo_encryption_alg_values_supported";
OidcConstants.UserInfoEncryptionEncValuesSupported = "userinfo_encryption_enc_values_supported";
OidcConstants.UserInfoSigningAlgorithmsSupported = "userinfo_signing_alg_values_supported";
OidcConstants.TlsClientCertificateBoundAccessTokens = "tls_client_certificate_bound_access_tokens";
//# sourceMappingURL=oidc-constants.js.map