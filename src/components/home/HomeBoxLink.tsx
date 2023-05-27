import { Pressable, View } from "react-native";
import { ProfileBoxLinkProps } from "../../types/profile";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useShadow from "../../hooks/useShadow";
import { RootTabParams } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeBoxLink({
  title,
  subtitle,
  icon,
}: ProfileBoxLinkProps) {
  const shadow = useShadow(24);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootTabParams, "Profile">>();
  return (
    <Pressable
      onPress={() => navigate("Profile")}
      style={{
        backgroundColor: "#F2F8FD",
        borderRadius: 32,
        paddingVertical: 24,
        paddingHorizontal: 36,
        marginBottom: 24,
        width: "100%",
        ...shadow,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            height: 52,
            width: 52,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Medium" }}>{icon}</Text>
        </View>
        <View
          style={{
            marginLeft: 16,
            justifyContent: "space-evenly",
            height: 52,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Medium",
              color: "#382E6D",
              opacity: 0.8,
            }}
          >
            {subtitle}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bold",
              color: "#382E6D",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
