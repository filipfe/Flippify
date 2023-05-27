import { useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../../const/theme";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../../const/styles";

const CategoryRef = (props: Category) => {
  const { navigate } = useNavigation<CategoryNavigationProps>();
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigate("TopicList", { category: props })}
    >
      <View style={styles.titleWrapper}>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={{ uri: props.icon }} />
        </View>
        <Text style={styles.title}>{props.name}</Text>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={styles.button}
        colors={linearGradient}
      >
        <Text style={styles.buttonText}>Wybierz</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    elevation: 12,
    shadowColor: "#3C85C2",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  title: {
    color: THEME.font,
    fontSize: 18,
    fontFamily: "SemiBold",
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
    height: 48,
    width: 48,
    borderRadius: 48,
    backgroundColor: THEME.light,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default CategoryRef;
