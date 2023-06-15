import { Pressable, View } from "react-native";
import { ProfileBoxLinkProps } from "../../types/profile";
import { Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import useShadow from "../../hooks/useShadow";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { RootTabParams } from "../../types/navigation";

export default function HomeBoxLink({
  to,
  title,
  subtitle,
  icon,
}: ProfileBoxLinkProps) {
  const { light, background, font } = useContext(ThemeContext);
  const shadow = useShadow(24);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootTabParams>>();
  return (
    <Pressable
      onPress={() => navigate("Profile", { screen: to })}
      style={{
        backgroundColor: background,
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
            backgroundColor: light,
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
              color: font,
              opacity: 0.8,
            }}
          >
            {subtitle}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bold",
              color: font,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
