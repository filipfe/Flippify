import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { shadowPrimary } from "../../styles/general";
import { FlashCardsIcon, HomeIcon, ProfileIcon } from "../../assets/general";
import { ThemeContext } from "../../context/ThemeContext";
import { RootStackParams, RootTabParams } from "../../types/navigation";
import { ListIcon, PlusIcon } from "../../assets/icons/icons";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

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
  const { primary, font, ripple } = useContext(ThemeContext);
  const { navigate } = navigation;

  const { options } = descriptors[route.key];
  const isCenterButton = index === Math.floor(state.routes.length / 2);
  const { title } = options;
  const isFocused = state.index === index;
  if (route.name === "AddCard") return <></>;
  return (
    <>
      {isCenterButton && <CenterButton />}
      <Pressable
        android_ripple={{
          radius: 36,
          color: ripple,
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
    case "Cards":
      return (
        <FlashCardsIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={20}
          width={20}
        />
      );
    case "Lists":
      return (
        <ListIcon
          stroke={isFocused ? primary : font}
          strokeWidth="1.4"
          height={19}
          width={20}
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
  const { navigate } = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <View
      style={{ alignItems: "center", marginTop: -16, alignSelf: "flex-start" }}
    >
      <Pressable onPress={() => navigate("AddCard")}>
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
    paddingHorizontal: 24,
  },
  tabBarLabel: {
    fontSize: 10,
    fontFamily: "SemiBold",
  },
  tabBarLink: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    flex: 1,
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
