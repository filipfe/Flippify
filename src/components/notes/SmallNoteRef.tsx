import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../../const/theme";
import { LikeIcon } from "../../assets/icons/icons";

export default function SmallNoteRef(props: Note) {
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
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.likesWrapper}>
          <Text style={styles.likesCount}>{like_count || 0}</Text>
          <LikeIcon
            strokeWidth={2}
            height={16}
            width={16}
            stroke={THEME.secondary}
          />
        </View>
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
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: THEME.font,
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 18,
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    color: THEME.secondary,
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
    marginRight: 4,
  },
});
