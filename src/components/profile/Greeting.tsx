import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-native";
import {
  DefaultProfileIcon,
  NotificationsIcon,
} from "../../assets/icons/icons";

export default function Greeting() {
  const { user } = useContext(AuthContext);
  const { username, profile_picture } = user;
  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        paddingTop: 64,
        paddingBottom: 112,
        paddingHorizontal: 32,
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View
          style={{
            borderWidth: 4,
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
        <View>
          <Text style={{ fontFamily: "Medium", color: "#FFF" }}>Cześć</Text>
          <Text style={{ fontFamily: "Bold", color: "#FFF", fontSize: 20 }}>
            {username}
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          height: 48,
          width: 48,
          borderRadius: 12,
          backgroundColor: "#F2F8FD",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationsIcon width={20} height={20} />
      </Pressable>
    </SafeAreaView>
  );
}
