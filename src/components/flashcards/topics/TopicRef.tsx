import { Topic } from "../../../types/flashcards";
import { Category } from "../../../types/general";
import { useNavigation } from "@react-navigation/native";
import { TopicListNavigationProp } from "../../../types/navigation";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEME } from "../../../const/theme";

const TopicRef = (props: Topic & { category: Category }) => {
  const navigation = useNavigation<TopicListNavigationProp>();
  const { category } = props;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate("FlashCardsGenerator", { topic: props, category })
      }
    >
      <Image
        style={{ resizeMode: "cover" }}
        source={{
          uri: props.image,
        }}
      />
      <Text style={styles.name}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    marginBottom: 32,
    borderColor: THEME.stroke,
    borderWidth: 2,
    borderRadius: 24,
    overflow: "hidden",
  },
  name: {
    marginVertical: 8,
    marginLeft: 16,
    fontFamily: "SemiBold",
    fontSize: 20,
  },
});

export default TopicRef;
