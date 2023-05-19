import App from "./App";
import AuthProvider from "./src/providers/AuthProvider";
import AxiosProvider from "./src/providers/AxiosProvider";
import utilities from "./tailwind.json";
import { TailwindProvider } from "tailwind-rn";
import {
  useFonts,
  PlusJakartaSans_400Regular as Regular,
  PlusJakartaSans_500Medium as Medium,
  PlusJakartaSans_600SemiBold as SemiBold,
  PlusJakartaSans_700Bold as Bold,
  PlusJakartaSans_800ExtraBold as ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import Loader from "./src/components/Loader";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function AppWrapper() {
  const [isFontLoaded] = useFonts({
    Regular,
    Medium,
    SemiBold,
    Bold,
    ExtraBold,
  });

  if (!isFontLoaded) return <Loader />;

  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <AuthProvider>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </AuthProvider>
    </TailwindProvider>
  );
}
