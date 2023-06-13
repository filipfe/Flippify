import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { LikeIcon } from "../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function SmallNoteRef(props: Note) {
  const { font, secondary, background } = useContext(ThemeContext);
  const { title, image, like_count } = props;
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
      <View style={{ ...styles.textWrapper, backgroundColor: background }}>
        <Text style={{ ...styles.title, color: font }}>{title}</Text>
        <View style={styles.likesWrapper}>
          <Text style={{ ...styles.likesCount, color: secondary }}>
            {like_count || 0}
          </Text>
          <LikeIcon strokeWidth={2} height={16} width={16} stroke={secondary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 216,
    elevation: 16,
    shadowColor: "#3C85C2",
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },
  image: {
    height: 124,
  },
  textWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 18,
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
    marginRight: 4,
  },
});
