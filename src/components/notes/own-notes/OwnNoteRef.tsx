import { ThemeContext } from "../../../context/ThemeContext";
import { AddedNote, OwnNote } from "../../../types/notes";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SecondaryButton from "../../SecondaryButton";
import { useState } from "react";
import AreYouSure from "../../AreYouSure";
import useShadow from "../../../hooks/useShadow";
import { BinIcon, LikeIcon } from "../../../assets/icons/icons";

export default function OwnNoteRef(props: OwnNote) {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const {
    id,
    title,
    category,
    thumbnail,
    created_at,
    images,
    description,
    like_count,
  } = props;
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const { font, secondary, wrong, background } = useContext(ThemeContext);
  const shadow = useShadow(24);

  const handleDelete = () => {};

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => navigate("Note", { id, title })}
        style={styles.imageWrapper}
      >
        <View
          style={[styles.likesWrapper, shadow, { backgroundColor: background }]}
        >
          <Text style={[styles.likesText, { color: secondary }]}>
            {like_count || 0}
          </Text>
          <LikeIcon stroke={secondary} strokeWidth={2} width={12} height={12} />
        </View>
        <Image style={styles.image} source={{ uri: thumbnail }} />
      </Pressable>
      <View style={styles.contentWrapper}>
        <View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <Text style={[styles.category, { color: secondary }]}>
              {category.name}
            </Text>
            <Text style={[styles.createdAt, { color: secondary }]}>
              {new Date(created_at).toLocaleDateString("default")}
            </Text>
          </View>
          <Text style={[styles.title, { color: font }]}>{title}</Text>
          <Text style={[styles.desc, { color: secondary }]}>
            {description ||
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <SecondaryButton
            onPress={() =>
              navigate("AddNote", {
                ...props,
                images: images.map((image) => ({
                  uri: image,
                  name: image,
                  type: "",
                })),
              })
            }
            fontSize={10}
            paddingVertical={0}
            paddingHorizontal={24}
            text="Modyfikuj"
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setDeleteModalActive(true)}
            style={{
              backgroundColor: wrong,
              borderRadius: 12,
              paddingVertical: 8,
              marginLeft: 12,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BinIcon fill="#FFF" height={16} />
          </TouchableOpacity>
        </View>
      </View>
      <AreYouSure
        isActive={deleteModalActive}
        onSubmit={handleDelete}
        onReject={() => setDeleteModalActive(false)}
        text={`Czy na pewno chcesz usunąć notatkę "${title}"?`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "stretch",
    position: "relative",
  },
  imageWrapper: {
    borderRadius: 12,
    height: 144,
    width: 144,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  contentWrapper: {
    justifyContent: "space-between",
    marginLeft: 24,
    flex: 1,
  },
  title: {
    marginTop: 4,
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  category: {
    fontFamily: "SemiBold",
    fontSize: 12,
  },
  createdAt: {
    fontFamily: "Bold",
    fontSize: 10,
  },
  desc: {
    marginVertical: 12,
    fontFamily: "Medium",
    fontSize: 10,
    lineHeight: 14,
  },
  likesWrapper: {
    position: "absolute",
    left: 12,
    top: 8,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  likesText: {
    fontFamily: "SemiBold",
    fontSize: 12,
    lineHeight: 14,
    marginRight: 4,
  },
});
