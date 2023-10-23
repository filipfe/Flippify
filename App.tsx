import AuthProvider from "./src/providers/AuthProvider";
import {
  useFonts,
  PlusJakartaSans_400Regular as Regular,
  PlusJakartaSans_500Medium as Medium,
  PlusJakartaSans_600SemiBold as SemiBold,
  PlusJakartaSans_700Bold as Bold,
  PlusJakartaSans_800ExtraBold as ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import ThemeProvider from "./src/providers/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native";
import SettingsProvider from "./src/providers/SettingsProvider";
import * as SplashScreen from "expo-splash-screen";
import RootStack from "./src/navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontLoaded] = useFonts({
    Regular,
    Medium,
    SemiBold,
    Bold,
    ExtraBold,
  });

  if (!isFontLoaded)
    return <ActivityIndicator size="large" color={"#2386F1"} />;

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <AuthProvider>
          <SettingsProvider>
            <StatusBar translucent />
            <RootStack />
          </SettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
