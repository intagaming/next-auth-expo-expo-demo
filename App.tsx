import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SessionProvider, useSession } from "next-auth/expo";

const InnerApp = () => {
  const { data: session, status } = useSession();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Session status: {status}</Text>
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
