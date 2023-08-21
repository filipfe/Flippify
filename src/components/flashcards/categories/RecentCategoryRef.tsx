import { View, Text, StyleSheet } from "react-native";
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
  const { navigate } =
    useNavigation<NavigationProp<CardStackParams, "CategoryList">>();
  const shadow = useShadow(16);
  const { background, font, secondary } = useContext(ThemeContext);
  return (
    <View style={[styles.wrapper, shadow, { backgroundColor: background }]}>
      <RippleButton
        borderless
        onPress={() => navigate("TopicList", { category: props })}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.leftWrapper}>
            <View style={{ marginRight: 24 }}>
              <MathIcon strokeWidth={2.1} height={36} width={36} />
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
    borderRadius: 16,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  topic: {
    fontFamily: "SemiBold",
    fontSize: 14,
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
