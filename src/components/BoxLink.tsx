import { Pressable, View } from "react-native";
import { ProfileBoxLinkProps } from "../types/profile";
import { Text } from "react-native";
import useShadow from "../hooks/useShadow";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import RippleButton from "./RippleButton";

export default function BoxLink({
  navigate,
  title,
  subtitle,
  icon,
}: ProfileBoxLinkProps) {
  const { light, background, font, ripple } = useContext(ThemeContext);
  const shadow = useShadow(16);
  return (
    <View
      style={{
        backgroundColor: background,
        borderRadius: 32,
        marginBottom: 24,
        ...shadow,
        width: "100%",
      }}
    >
      <RippleButton borderless onPress={navigate}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 24,
            paddingHorizontal: 36,
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
            {typeof icon === "string" ? (
              <Text style={{ fontSize: 20, fontFamily: "Medium" }}>{icon}</Text>
            ) : (
              icon
            )}
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
      </RippleButton>
    </View>
  );
}
