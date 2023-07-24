import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {
  DefaultProfileIcon,
  NotificationsIcon,
} from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeHeader() {
  const { font, background } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { username, profile_picture } = user;
  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        padding: 24,
        paddingBottom: 36,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: "#FFFFFF",
            width: 52,
            height: 52,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 255,
            marginRight: 16,
          }}
        >
          {profile_picture ? (
            <Image source={{ uri: profile_picture }} />
          ) : (
            <DefaultProfileIcon width={48} height={48} />
          )}
        </View>
      </View>
      <Pressable
        style={{
          height: 48,
          width: 48,
          borderRadius: 12,
          backgroundColor: background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationsIcon stroke={font} width={20} height={20} />
      </Pressable>
    </SafeAreaView>
  );
}
