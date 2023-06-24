import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { Note } from "../../types/notes";
import { LikeIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";
import { NoteRefNavigationProp } from "../../types/navigation";
import RippleButton from "../RippleButton";

const NoteRef = (props: Note) => {
  const { secondary, background, font } = useContext(ThemeContext);
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  const { title, thumbnail, like_count } = props;
  return (
    <View style={{ backgroundColor: background, flex: 1 }}>
      <RippleButton borderless onPress={() => navigate("Note", { ...props })}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: thumbnail,
            }}
          />
          <View style={styles.textWrapper}>
            <Text style={{ ...styles.title, color: font }}>{title}</Text>
            <View style={styles.likesWrapper}>
              <Text style={{ ...styles.likesCount, color: secondary }}>
                {like_count || 0}
              </Text>
              <LikeIcon
                strokeWidth={2}
                height={12}
                width={12}
                stroke={secondary}
              />
            </View>
          </View>
        </View>
      </RippleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 164,
  },
  textWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 18,
    maxWidth: "95%",
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "SemiBold",
    fontSize: 12,
    lineHeight: 14,
    marginRight: 4,
  },
});

export default NoteRef;
