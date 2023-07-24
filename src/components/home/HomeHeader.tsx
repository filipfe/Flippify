import { useContext } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {
  DefaultProfileIcon,
  LogoIcon,
  PremiumIcon,
} from "../../assets/icons/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";

export default function HomeHeader() {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const { user } = useContext(AuthContext);
  const { profile_picture, is_premium } = user;
  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}
    >
      {is_premium ? <PremiumIcon width={48} /> : <LogoIcon width={48} />}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate("Profile", { screen: "Profile" })}
        style={{ alignItems: "center", flexDirection: "row" }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: "#FFFFFF",
            width: 40,
            height: 40,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 255,
          }}
        >
          {profile_picture ? (
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: profile_picture }}
            />
          ) : (
            <DefaultProfileIcon width={40} height={40} />
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
