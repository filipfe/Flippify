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
import { ActivityIndicator } from "react-native";
import SettingsProvider from "./src/providers/SettingsProvider";
import * as SplashScreen from "expo-splash-screen";
import Introduction from "./src/components/ui/Introduction";
import RootStack from "./src/navigators/RootStack";

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
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <StatusBar translucent />
          <RootStack />
          <Introduction />
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
