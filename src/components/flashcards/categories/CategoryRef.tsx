import { useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import { StyleSheet, Text, Pressable, useColorScheme } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { MathIcon } from "../../../assets/icons/icons";
import useShadow from "../../../hooks/useShadow";

const CategoryRef = (props: Category) => {
  const { name } = props;
  const { font, box, secondary, userPreferredTheme } = useContext(ThemeContext);
  const { navigate } = useNavigation<CategoryNavigationProps>();
  const shadow = useShadow(16);
  const colorScheme = useColorScheme();

  const theme =
    userPreferredTheme === "system" ? colorScheme : userPreferredTheme;

  return (
    <Pressable
      onPress={() => navigate("TopicList", { category: props })}
      style={[
        styles.flex,
        theme === "light" && shadow,
        styles.wrapper,
        { backgroundColor: box },
      ]}
    >
      <MathIcon />
      <Text style={[styles.title, { color: font }]}>{name}</Text>
      <Text style={[styles.topicCount, { color: secondary }]}>12 tematów</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  topicCount: {
    fontFamily: "SemiBold",
    fontSize: 14,
  },
  iconWrapper: {
    height: 64,
    width: 64,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default CategoryRef;
