import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SessionProvider, useSession, signIn } from "next-auth/expo";
import { signinGithub } from "./src/ExpoAuth";

const InnerApp = () => {
  const { data: session, status } = useSession();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Session status: {status}</Text>
      {status === "unauthenticated" && (
        <Button
          onPress={() => signIn("github-expo", signinGithub)}
          title="Sign in with GitHub"
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <SessionProvider>
      <InnerApp />
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
