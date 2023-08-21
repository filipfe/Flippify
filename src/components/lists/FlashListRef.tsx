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
  LikeIcon,
  LogoIcon,
  MathIcon,
  PremiumIcon,
} from "../../assets/icons/icons";
import GradientText from "../ui/GradientText";

const { width } = Dimensions.get("screen");

type Props = {
  size?: "small" | "big";
};

export default function FlashListRef(props: FlashList & Props) {
  const colorScheme = useColorScheme();
  const { size = "big" } = props;
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  const { font, box, secondary, userPreferredTheme } = useContext(ThemeContext);
  const shadow = useShadow(16);
  const isLight =
    userPreferredTheme === "system"
      ? colorScheme === "light"
      : userPreferredTheme === "light";
  const { name, description, category, user } = props;
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          backgroundColor: box,
          ...(size === "big" && { width: width - 48 }),
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
        {size === "big" && (
          <Text style={[styles.count, { color: secondary }]}>53 fiszki</Text>
        )}
      </View>
      {size === "big" && (
        <Text style={[styles.desc, { color: secondary }]}>{description}</Text>
      )}
      <View
        style={[
          styles.row,
          styles.between,
          { marginTop: 12, paddingBottom: 6 },
        ]}
      >
        <View style={styles.row}>
          {user.is_premium || true ? (
            <PremiumIcon height={16} width={16} />
          ) : (
            <LogoIcon height={16} width={16} />
          )}
          <Text style={[styles.username, { color: font }]}>
            {user.username}
          </Text>
        </View>
        <View style={[styles.row, { marginLeft: 16 }]}>
          <GradientLikeIcon height={12} width={12} />
          <GradientText style={styles.likeCount}>244</GradientText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    marginHorizontal: 24,
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
    fontSize: 12,
    fontFamily: "Medium",
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
