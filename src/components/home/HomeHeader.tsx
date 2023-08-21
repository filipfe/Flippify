import { useContext } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  useColorScheme,
  Text,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {
  DefaultProfileIcon,
  LogoIcon,
  PremiumIcon,
} from "../../assets/icons/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";
import { ThemeContext } from "../../context/ThemeContext";

export default function HomeHeader() {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const colorScheme = useColorScheme();
  const { userPreferredTheme, font } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { avatar_url, is_premium } = user;

  const theme =
    userPreferredTheme === "system" ? colorScheme : userPreferredTheme;

  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 8,
      }}
    >
      {theme === "light" ? (
        <Text style={{ color: font, fontFamily: "Bold", fontSize: 20 }}>
          Eksploruj
        </Text>
      ) : is_premium ? (
        <PremiumIcon width={44} />
      ) : (
        <LogoIcon width={44} />
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate("Profile", { screen: "ProfileScreen" })}
        style={{ alignItems: "center", flexDirection: "row" }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: "#FFFFFF",
            width: 36,
            height: 36,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 255,
          }}
        >
          {avatar_url ? (
            <Image
              style={{ width: 36, height: 36 }}
              source={{ uri: avatar_url }}
            />
          ) : (
            <DefaultProfileIcon width={36} height={36} />
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
