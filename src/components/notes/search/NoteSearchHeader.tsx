import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../../const/theme";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function NoteSearchHeader(props: NativeStackHeaderProps) {
  const { navigation } = props;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>T</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    height: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    width: "100%",
  },
  title: {
    color: THEME.font,
    fontFamily: "SemiBold",
    fontSize: 20,
  },
});
