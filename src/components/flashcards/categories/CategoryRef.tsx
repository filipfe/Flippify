import { useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../PrimaryButton";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const CategoryRef = (props: Category) => {
  const { font, secondary, background } = useContext(ThemeContext);
  const { navigate } = useNavigation<CategoryNavigationProps>();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <View style={styles.topWrapper}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={{ uri: props.icon }} />
          </View>
          <Text style={{ ...styles.title, color: font }}>{props.name}</Text>
        </View>
        <Text style={{ ...styles.topicCount, color: secondary }}>
          24 tematy
        </Text>
      </View>
      <PrimaryButton
        onPress={() => navigate("TopicList", { category: props })}
        paddingVertical={10}
        width={"100%"}
        text="Wybierz"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    elevation: 12,
    shadowColor: "#3C85C2",
    marginBottom: 24,
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 24,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: "SemiBold",
    lineHeight: 18,
  },
  topicCount: {
    fontFamily: "SemiBold",
    fontSize: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: {
    fontFamily: "ExtraBold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 44,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default CategoryRef;
