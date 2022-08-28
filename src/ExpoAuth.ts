import * as AuthSession from "expo-auth-session";
import { getSignInInfo, SigninResult } from "next-auth/expo";
import { Alert } from "react-native";

export const signinGithub = async (): Promise<SigninResult> => {
  const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true }); // https://auth.expo.io
  const provider = "github-expo";
  const signinInfo = await getSignInInfo({ provider, proxyRedirectUri });
  if (!signinInfo) {
    Alert.alert("Error", "Couldn't get sign in info from server");
    return;
  }
  const { state, codeChallenge, stateEncrypted, codeVerifier, clientId } =
    signinInfo;

  // This corresponds to useLoadedAuthRequest
  const request = new AuthSession.AuthRequest({
    clientId,
    scopes: ["read:user", "user:email", "openid"],
    redirectUri: proxyRedirectUri,
    codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
  });
  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint:
      "https://github.com/settings/connections/applications/3fbd7538a8f71f47cba1",
  };

  request.state = state;
  request.codeChallenge = codeChallenge;
  await request.makeAuthUrlAsync(discovery);

  // useAuthRequestResult
  const result = await request.promptAsync(discovery, { useProxy: true });
  return {
    result,
    state,
    stateEncrypted,
    codeVerifier,
    provider,
  };
};
