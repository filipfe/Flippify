import { Pressable, View } from "react-native";
import { ProfileBoxLinkProps } from "../types/profile";
import { Text } from "react-native";
import useShadow from "../hooks/useShadow";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function BoxLink({
  navigate,
  title,
  subtitle,
  icon,
}: ProfileBoxLinkProps) {
  const { light, background, font } = useContext(ThemeContext);
  const shadow = useShadow(16);
  return (
    <Pressable
      onPress={navigate}
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
