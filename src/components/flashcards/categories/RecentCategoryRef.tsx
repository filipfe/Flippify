import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CardStackParams } from "../../../types/navigation";
import RippleButton from "../../ui/RippleButton";
import { ArrowIcon, MathIcon } from "../../../assets/icons/icons";
import { ThemeContext } from "../../../context/ThemeContext";
import useShadow from "../../../hooks/useShadow";

export default function RecentCategoryRef(props: Category) {
  const { name } = props;
  const colorScheme = useColorScheme();
  const { navigate } =
    useNavigation<NavigationProp<CardStackParams, "CategoryList">>();
  const shadow = useShadow(16);
  const { box, font, secondary, userPreferredTheme } = useContext(ThemeContext);

  const theme =
    userPreferredTheme === "system" ? colorScheme : userPreferredTheme;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: box },
        theme === "light" && shadow,
      ]}
    >
      <RippleButton
        borderless
        onPress={() => navigate("TopicList", { category: props })}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.leftWrapper}>
            <View style={{ marginRight: 24 }}>
              <MathIcon strokeWidth={2.4} height={28} width={28} />
            </View>
            <View>
              <Text style={[styles.title, { color: font }]}>{name}</Text>
              <Text style={[styles.topic, { color: secondary }]}>
                24 tematów
              </Text>
            </View>
          </View>
          <ArrowIcon fill={font} />
        </View>
      </RippleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
  },
  title: {
    fontFamily: "SemiBold",
    marginBottom: 4,
  },
  topic: {
    fontFamily: "Medium",
    fontSize: 12,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
