import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../../const/theme";

export default function SmallNoteRef(props: Note) {
  const { title, image } = props;
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => navigate("Note", { ...props })}
    >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 192,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    elevation: 16,
    shadowColor: "#3C85C2",
    backgroundColor: "#FFFFFF",
  },
  image: {
    height: 124,
  },
  textWrapper: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingVertical: 12,
  },
  title: {
    color: THEME.font,
    fontFamily: "SemiBold",
    fontSize: 18,
  },
});
