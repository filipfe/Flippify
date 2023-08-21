import { FavouriteCategory } from "../../types/home";
import { View, Text, StyleSheet } from "react-native";
import useShadow from "../../hooks/useShadow";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ArrowIcon, MathIcon } from "../../assets/icons/icons";
import RippleButton from "../ui/RippleButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";

export default function InProgressRef({ category, topic }: FavouriteCategory) {
  const { navigate } = useNavigation<NavigationProp<RootTabParams, "Home">>();
  const shadow = useShadow(16);
  const { background, font, secondary } = useContext(ThemeContext);
  return (
    <View style={[styles.wrapper, shadow, { backgroundColor: background }]}>
      <RippleButton
        borderless
        onPress={() =>
          navigate("FlashCards", {
            screen: "FlashCardsGenerator",
            params: { category, topic },
          })
        }
      >
        <View style={styles.innerWrapper}>
          <View style={styles.leftWrapper}>
            <View style={{ marginRight: 24 }}>
              <MathIcon height={36} width={36} />
            </View>
            <View>
              <Text style={[styles.title, { color: font }]}>
                {category.name}
              </Text>
              <Text style={[styles.topic, { color: secondary }]}>
                {topic?.name || "Wszystkie tematy"}
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

    marginBottom: 16,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    marginBottom: 4,
  },
  topic: {
    fontFamily: "SemiBold",
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
