import { Pressable, Text, Dimensions, StyleSheet } from "react-native";
import { FlashList } from "../../types/flashcards";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types/navigation";

const { width } = Dimensions.get("screen");

type Props = {
  size?: "small" | "big";
};

export default function FlashListRef(props: FlashList & Props) {
  const { size = "big" } = props;
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  const { font, box } = useContext(ThemeContext);
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          backgroundColor: box,
          width: size === "big" ? width - 48 : (width - 48) / 2,
        },
      ]}
      onPress={() => navigate("ListDetailsScreen", props)}
    >
      <Text style={{ color: font }}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    marginHorizontal: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 128,
  },
});
