import { StyleSheet, View } from "react-native";
import { ProfileBoxLinkProps } from "../../types/profile";
import { Text } from "react-native";
import useShadow from "../../hooks/useShadow";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import RippleButton from "./RippleButton";

export default function BoxLink({
  navigate,
  title,
  count,
  icon,
}: ProfileBoxLinkProps) {
  const { light, background, font, secondary } = useContext(ThemeContext);
  const shadow = useShadow(16);
  return (
    <View style={[shadow, styles.wrapper, { backgroundColor: background }]}>
      <RippleButton borderless onPress={navigate}>
        <View style={styles.innerWrapper}>
          <View style={{ marginBottom: 2 }}>
            {typeof icon === "string" ? (
              <Text style={{ fontSize: 20, fontFamily: "Medium" }}>{icon}</Text>
            ) : (
              icon
            )}
          </View>
          <Text style={[styles.title, { color: font, marginTop: 2 }]}>
            {title}
          </Text>
          <View style={[styles.countWrapper, { backgroundColor: light }]}>
            <Text style={[styles.count, { color: secondary }]}>{count}</Text>
          </View>
        </View>
      </RippleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    flex: 1,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  innerWrapper: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 8,
    position: "relative",
  },
  title: {
    fontSize: 12,
    fontFamily: "SemiBold",
  },
  countWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: 16,
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 10,
    fontFamily: "SemiBold",
  },
});
