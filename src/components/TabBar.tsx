import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { shadowPrimary } from "../styles/general";
import {
  FlashCardsIcon,
  HomeIcon,
  NotesIcon,
  ProfileIcon,
} from "../assets/general";
import GradientText from "./GradientText";
import { ThemeContext } from "../context/ThemeContext";
import { RootTabParams } from "../types/navigation";
import RippleButton from "./RippleButton";
import { initialAddedNote } from "../const/notes";
import { PlusIcon } from "../assets/icons/icons";

export default function TabBar(props: BottomTabBarProps) {
  const { state } = props;
  const { background } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.tabBar, backgroundColor: background }}>
      <View style={styles.linkWrapper}>
        {state.routes.map((route, index) => (
          <TabBarLink {...props} route={route} index={index} key={route.key} />
        ))}
      </View>
    </View>
  );
}

type LinkProps = { route: any; index: number };

function TabBarLink({
  state,
  descriptors,
  navigation,
  index,
  route,
}: BottomTabBarProps & LinkProps) {
  const { primary, font } = useContext(ThemeContext);
  const { navigate } = navigation;

  const { options } = descriptors[route.key];
  const isCenterButton = index === Math.floor(state.routes.length / 2) - 1;
  const { title } = options;
  const isFocused = state.index === index;
  if (route.name === "AddCard" || route.name === "AddNote") return <></>;
  return (
    <>
      {isCenterButton && <CenterButton />}
      <Pressable
        android_ripple={{
          radius: 36,
          color: "#0B0918",
          borderless: true,
        }}
        style={styles.tabBarLink}
        onPress={() => navigate(route.name, route.params)}
      >
        <LinkIcon
          route={route.name as keyof RootTabParams}
          isFocused={isFocused}
        />
        <Text
          style={{
            ...styles.tabBarLabel,
            color: isFocused ? primary : font,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
}

const LinkIcon = ({
  route,
  isFocused,
}: {
  route: keyof RootTabParams;
  isFocused: boolean;
}) => {
  const { primary, font } = useContext(ThemeContext);
  switch (route) {
    case "Home":
      return (
        <HomeIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={23}
          width={23}
        />
      );
    case "FlashCards":
      return (
        <FlashCardsIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={20}
          width={20}
        />
      );
    case "Notes":
      return (
        <NotesIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={21}
          width={21}
        />
      );
    case "Profile":
      return (
        <ProfileIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={22}
          width={22}
        />
      );
    default:
      return <></>;
  }
};

const CenterButton = () => {
  const { font, light, primary, background } = useContext(ThemeContext);
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
      <Modal
        transparent
        visible={active}
        onRequestClose={() => setActive(false)}
        statusBarTranslucent
        animationType="fade"
      >
        <Pressable onPress={() => setActive(false)} style={styles.modalWrapper}>
          <View style={{ ...styles.modal, backgroundColor: background }}>
            <Text
              style={{
                color: font,
                fontFamily: "Bold",
                fontSize: 16,
                paddingVertical: 12,
              }}
            >
              Twórz
            </Text>
            <View
              style={{
                borderRadius: 16,
                height: 1,
                width: "100%",
                maxWidth: "50%",
                backgroundColor: light,
                marginBottom: 12,
              }}
            />
            <RippleButton onPress={() => navigate("AddCard")}>
              <View style={styles.centerButtonLink}>
                <FlashCardsIcon stroke={primary} strokeWidth={2} height={24} />
                <GradientText style={{ fontFamily: "Bold", marginLeft: 12 }}>
                  Nowa fiszka
                </GradientText>
              </View>
            </RippleButton>
            <RippleButton onPress={() => navigate("AddNote")}>
              <View style={styles.centerButtonLink}>
                <NotesIcon
                  stroke={primary}
                  strokeWidth={1.6}
                  height={24}
                  width={24}
                />
                <GradientText style={{ fontFamily: "Bold", marginLeft: 12 }}>
                  Nowa notatka
                </GradientText>
              </View>
            </RippleButton>
          </View>
        </Pressable>
      </Modal>
      <Pressable onPress={() => setActive((prev) => !prev)}>
        <LinearGradient
          style={styles.centerButton}
          start={{ x: 0, y: 0 }}
          colors={linearGradient}
        >
          <PlusIcon />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    alignItems: "center",
    flexDirection: "row",
    ...shadowPrimary,
  },
  linkWrapper: {
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "SemiBold",
  },
  tabBarLink: {
    height: "100%",
    justifyContent: "center",
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
    paddingBottom: 16,
    alignItems: "center",
    elevation: 32,
    shadowOffset: {
      height: -4,
      width: 0,
    },
  },
  modalWrapper: {
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  centerButtonLink: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  sceneContainer: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "Bold",
  },
});
