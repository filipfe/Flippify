import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { THEME } from "../const/theme";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { RootTabParams } from "../../App";
import { useState, useEffect } from "react";
import { shadowPrimary } from "../styles/general";
import {
  FlashCardsIcon,
  HomeIcon,
  NotesIcon,
  ProfileIcon,
} from "../assets/general";
import GradientText from "./GradientText";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isCenterButton = index === Math.floor(state.routes.length / 2);
        const { title } = options;
        const isFocused = state.index === index;
        return (
          <>
            {isCenterButton && <CenterButton />}
            <Pressable
              style={styles.tabBarLink}
              onPress={() => navigation.navigate(route.name)}
            >
              <LinkIcon
                route={route.name as keyof RootTabParams}
                isFocused={isFocused}
              />
              <Text
                style={{
                  ...styles.tabBarLabel,
                  color: isFocused ? THEME.primary : THEME.font,
                }}
              >
                {title}
              </Text>
            </Pressable>
          </>
        );
      })}
    </View>
  );
}

const LinkIcon = ({
  route,
  isFocused,
}: {
  route: keyof RootTabParams;
  isFocused: boolean;
}) => {
  switch (route) {
    case "Home":
      return (
        <HomeIcon
          stroke={isFocused ? "#2386F1" : "#382E6D"}
          strokeWidth="2"
          height={23}
          width={23}
        />
      );
    case "FlashCards":
      return (
        <FlashCardsIcon
          stroke={isFocused ? "#2386F1" : "#382E6D"}
          strokeWidth="2"
          height={20}
          width={20}
        />
      );
    case "Notes":
      return (
        <NotesIcon
          stroke={isFocused ? "#2386F1" : "#382E6D"}
          strokeWidth="2"
          height={21}
          width={21}
        />
      );
    case "Profile":
      return (
        <ProfileIcon
          stroke={isFocused ? "#2386F1" : "#382E6D"}
          strokeWidth="2"
          height={22}
          width={22}
        />
      );
  }
};

const CenterButton = () => {
  const [active, setActive] = useState(false);
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const location = useNavigationState((state) => state);

  useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <View
      style={{ alignItems: "center", marginTop: -16, alignSelf: "flex-start" }}
    >
      {active && (
        <Modal
          transparent={true}
          visible={active}
          onRequestClose={() => setActive(false)}
          animationType="slide"
          style={{ position: "relative" }}
        >
          <View style={styles.modal}>
            <Text
              style={{
                color: THEME.font,
                fontFamily: "SemiBold",
                fontSize: 16,
                borderBottomColor: THEME.light,
                borderBottomWidth: 2,
                paddingBottom: 12,
                marginBottom: 6,
              }}
            >
              Twórz
            </Text>
            <Pressable
              style={{
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigate("FlashCards", { screen: "AddCard" })}
            >
              <LinearGradient
                style={styles.centerButtonLink}
                start={{ x: 0, y: 0 }}
                colors={linearGradient}
              >
                <FlashCardsIcon stroke="#FFF" strokeWidth={2} height={12} />
              </LinearGradient>
              <GradientText style={{ fontFamily: "Bold", marginLeft: 12 }}>
                Nowa fiszka
              </GradientText>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigate("Notes", { screen: "AddNote" })}
            >
              <LinearGradient
                style={styles.centerButtonLink}
                start={{ x: 0, y: 0 }}
                colors={linearGradient}
              >
                <NotesIcon stroke="#FFF" strokeWidth={1.5} height={16} />
              </LinearGradient>
              <GradientText style={{ fontFamily: "Bold", marginLeft: 12 }}>
                Nowa notatka
              </GradientText>
            </Pressable>
          </View>
        </Modal>
      )}
      <Pressable onPress={() => setActive((prev) => !prev)}>
        <LinearGradient
          style={styles.centerButton}
          start={{ x: 0, y: 0 }}
          colors={linearGradient}
        >
          <Text
            style={{
              ...styles.centerButtonLabel,
              transform: [{ rotate: active ? "45deg" : "0deg" }],
            }}
          >
            +
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#FFF",
    ...shadowPrimary,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Bold",
  },
  tabBarLink: {
    alignItems: "center",
  },
  centerButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    width: 52,
    borderRadius: 52,
  },
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    position: "absolute",
    shadowColor: THEME.primary,
    alignSelf: "center",
    elevation: 32,
    shadowOffset: {
      height: -4,
      width: 0,
    },
  },
  centerButtonLabel: {
    fontFamily: "SemiBold",
    fontSize: 24,
    lineHeight: 24,
    color: "white",
  },
  centerButtonLink: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
    borderRadius: 36,
  },
  sceneContainer: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "Bold",
  },
});
