import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackIcon } from "../assets/icons/icons";
import { useNavigationState } from "@react-navigation/native";

export default function Header({
  route,
  navigation,
  options,
}: NativeStackHeaderProps) {
  const { background, font } = useContext(ThemeContext);
  const { title, headerRight, headerTransparent } = options;
  const { goBack, canGoBack } = navigation;
  const state = useNavigationState((state) => state.routeNames);
  const isInitial = state[0] === route.name;
  const canGoBackBool = canGoBack();
  return (
    <SafeAreaView
      style={{
        ...styles.wrapper,
        backgroundColor: headerTransparent ? "transparent" : background,
      }}
    >
      <View style={styles.titleWrapper}>
        {!isInitial && canGoBackBool && (
          <View style={{ marginRight: 24 }}>
            <TouchableWithoutFeedback style={styles.back} onPress={goBack}>
              <BackIcon
                height={16}
                width={16}
                fill={headerTransparent ? "#FFF" : font}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
        <Text
          style={{ ...styles.title, color: headerTransparent ? "#FFF" : font }}
        >
          {title}
        </Text>
      </View>
      {headerRight && headerRight({ canGoBack: canGoBackBool })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 80,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 22,
  },
  back: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
});
