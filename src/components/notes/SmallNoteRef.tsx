import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { LikeIcon } from "../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function SmallNoteRef(props: Note) {
  const { font, secondary, background, light } = useContext(ThemeContext);
  const { title, image, like_count } = props;
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <Pressable
      style={{ ...styles.wrapper, backgroundColor: background }}
      onPress={() => navigate("Note", { ...props })}
    >
      <View style={{ ...styles.image, backgroundColor: secondary }}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={{ ...styles.textWrapper }}>
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
    width: 196,
    marginBottom: 24,
  },
  image: {
    height: 124,
    borderRadius: 16,
    overflow: "hidden",
  },
  textWrapper: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "SemiBold",
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
