import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackIcon } from "../../assets/icons/icons";
import { useNavigationState } from "@react-navigation/native";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export default function Header({
  route,
  navigation,
  options,
}: BottomTabHeaderProps | NativeStackHeaderProps) {
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
          <Pressable style={styles.back} onPress={goBack}>
            <BackIcon
              height={16}
              width={16}
              fill={headerTransparent ? "#FFF" : font}
            />
          </Pressable>
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
    height: "100%",
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
  },
});
