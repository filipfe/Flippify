import { useNavigation } from "@react-navigation/native";
import { Category } from "../../../types/general";
import { CategoryNavigationProps } from "../../../types/navigation";
import { Image, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import RippleButton from "../../RippleButton";

const CategoryRef = ({ index, ...props }: Category & { index: number }) => {
  const { font, light } = useContext(ThemeContext);
  const { navigate } = useNavigation<CategoryNavigationProps>();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
      }}
    >
      <RippleButton
        borderless
        onPress={() => navigate("TopicList", { category: props })}
      >
        <View style={[styles.wrapper]}>
          <View style={[styles.iconWrapper, { backgroundColor: light }]}>
            <Image style={styles.icon} source={{ uri: props.icon }} />
          </View>
          <Text style={{ ...styles.title, color: font }}>{props.name}</Text>
        </View>
      </RippleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "SemiBold",
    lineHeight: 22,
    textAlign: "center",
  },
  topicCount: {
    fontFamily: "SemiBold",
    fontSize: 12,
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
