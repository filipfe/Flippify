import {
  Pressable,
  Text,
  View,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { FlashList } from "../../types/flashcards";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types/navigation";
import useShadow from "../../hooks/useShadow";
import {
  GradientLikeIcon,
  LogoIcon,
  MathIcon,
  PremiumIcon,
} from "../../assets/icons/icons";
import GradientText from "../ui/GradientText";
import { FlashCardsIcon } from "../../assets/general";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

type Props = {
  size?: "small" | "big";
  isActive?: boolean;
  hideUser?: boolean;
};

export default function FlashListRef(props: FlashList & Props) {
  const colorScheme = useColorScheme();
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  const { font, box, secondary, userPreferredTheme } = useContext(ThemeContext);
  const shadow = useShadow(16);
  const isLight =
    userPreferredTheme === "system"
      ? colorScheme === "light"
      : userPreferredTheme === "light";
  const {
    name,
    description,
    category,
    cards_count,
    likes_count,
    user,
    is_public,
    isActive,
    hideUser,
    size = "big",
  } = props;

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity:
        size === "big"
          ? withTiming(isActive ? 1 : 0.6, {
              duration: 200,
              easing: Easing.in((v) => v),
            })
          : 1,
      transform: [
        {
          translateY:
            size === "big"
              ? withTiming(isActive ? -8 : 0, {
                  duration: 200,
                  easing: Easing.in((v) => v),
                })
              : 0,
        },
      ],
    }),
    [isActive]
  );

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          marginHorizontal: 8,
          ...(size === "big" && { width: width - 48 }),
        },
      ]}
    >
      <Pressable
        style={[
          styles.wrapper,
          {
            backgroundColor: box,
          },
          isLight && shadow,
        ]}
        onPress={() => navigate("ListDetailsScreen", props)}
      >
        <View style={styles.row}>
          <MathIcon strokeWidth={2.4} height={14} width={14} />
          <GradientText style={styles.category}>{category?.name}</GradientText>
        </View>
        <View style={[styles.row, styles.between]}>
          <Text
            style={[
              styles.title,
              { color: font, fontSize: size === "small" ? 14 : 16 },
            ]}
          >
            {name}
          </Text>
          <View style={[styles.row]}>
            <FlashCardsIcon
              strokeWidth={size === "big" ? 1.6 : 1.7}
              stroke={secondary}
              height={size === "big" ? 15 : 13}
              width={size === "big" ? 15 : 13}
            />
            <Text
              style={[
                styles.count,
                {
                  color: secondary,
                  fontSize: size === "big" ? 14 : 12,
                  lineHeight: size === "big" ? 18 : 16,
                },
              ]}
            >
              {cards_count}
            </Text>
          </View>
        </View>
        {size === "big" && (
          <Text style={[styles.desc, { color: secondary }]}>{description}</Text>
        )}
        {is_public && (
          <View
            style={[
              styles.row,
              styles.between,
              { marginTop: 12, paddingBottom: 6 },
            ]}
          >
            {!hideUser && (
              <View style={[styles.row, , { marginRight: 16 }]}>
                {user.is_premium || true ? (
                  <PremiumIcon height={16} width={16} />
                ) : (
                  <LogoIcon height={16} width={16} />
                )}
                <Text style={[styles.username, { color: font }]}>
                  {user.username}
                </Text>
              </View>
            )}
            <View style={styles.row}>
              <GradientLikeIcon height={12} width={12} />
              <GradientText style={styles.likeCount}>
                {likes_count}
              </GradientText>
            </View>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  category: {
    fontFamily: "SemiBold",
    fontSize: 12,
    marginLeft: 8,
    lineHeight: 16,
  },
  title: {
    fontFamily: "SemiBold",
    marginVertical: 6,
  },
  count: {
    fontFamily: "SemiBold",
    marginLeft: 6,
  },
  desc: {
    fontSize: 12,
    fontFamily: "Medium",
    lineHeight: 18,
    marginVertical: 6,
  },
  username: {
    fontSize: 12,
    fontFamily: "SemiBold",
    lineHeight: 16,
    marginLeft: 6,
  },
  likeCount: {
    fontFamily: "SemiBold",
    fontSize: 12,
    marginLeft: 4,
    lineHeight: 16,
  },
});
