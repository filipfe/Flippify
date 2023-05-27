import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_URL } from "@env";
import { Note, NoteStackParams } from "../../types/notes";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import { THEME } from "../../const/theme";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { initialNote } from "../../const/notes";
import {
  DefaultProfileIcon,
  LikeIcon,
  ResizeIcon,
} from "../../assets/icons/icons";
import { shadowPrimary } from "../../styles/general";

type NoteRouteProp = RouteProp<NoteStackParams, "Note">;

export default function NoteDetails({ route }: { route: NoteRouteProp }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Note>(initialNote);
  const [isLiked, setIsLiked] = useState(false);
  const { title, created_at, user, image } = details;
  const { profile_picture, username } = user;

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      return axios.delete(`${API_URL}/api/notes/${id}/likes/delete`);
    } else {
      return axios.post(`${API_URL}/api/notes/${id}/likes/add`, null);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setDetails(data);
        setIsLiked(data.is_liked);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <View style={styles.loaderWrapper}>
        <Loader />
      </View>
    );

  return (
    <ScrollView>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingHorizontal: 24,
          }}
        >
          <View style={{ marginTop: -132, marginBottom: 32 }}>
            <View style={styles.imageWrapper}>
              <Image
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                }}
                source={{
                  uri: image,
                }}
              />
              <Pressable style={styles.resize}>
                <ResizeIcon />
              </Pressable>
            </View>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Text style={styles.date}>
              {new Date(created_at).toLocaleDateString("default")}
            </Text>
            <Text style={styles.noteTitle}>{title}</Text>
            <Text style={styles.noteDesc}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              assumenda obcaecati, harum molestiae iusto accusamus facilis
              asperiores quisquam ad, rerum totam aut corporis neque. Voluptate
              nesciunt obcaecati natus? Deleniti, numquam!
            </Text>
            <View style={styles.bottomWrapper}>
              <View style={styles.userWrapper}>
                <View style={styles.userPicture}>
                  {profile_picture ? (
                    <Image
                      style={{ width: 52, height: 52 }}
                      source={{ uri: profile_picture }}
                    />
                  ) : (
                    <DefaultProfileIcon width={52} height={52} />
                  )}
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.addedBy}>Dodane przez</Text>
                  <Text style={styles.username}>{username}</Text>
                </View>
              </View>
              <Pressable onPress={handleLike} style={styles.likeButton}>
                <LikeIcon
                  stroke={isLiked ? THEME.primary : THEME.font}
                  strokeWidth={2}
                  fill={isLiked ? THEME.primary : "none"}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 256,
  },
  loaderWrapper: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: 320,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    ...shadowPrimary,
  },
  noteDescWrapper: {
    flex: 1,
  },
  date: {
    fontFamily: "ExtraBold",
    color: THEME.secondary,
    marginBottom: 4,
  },
  noteTitle: {
    fontFamily: "ExtraBold",
    fontSize: 24,
    marginBottom: 8,
    color: THEME.font,
  },
  noteDesc: {
    color: THEME.secondary,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Medium",
    marginTop: 8,
  },
  bottomWrapper: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  userPicture: {
    height: 52,
    width: 52,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadowPrimary,
  },
  likeButton: {
    height: 56,
    width: 56,
    backgroundColor: THEME.light,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addedBy: {
    fontFamily: "SemiBold",
    fontSize: 12,
    color: THEME.secondary,
    lineHeight: 20,
  },
  username: {
    color: THEME.font,
    fontFamily: "Bold",
    lineHeight: 24,
  },
  resize: {
    height: 48,
    width: 48,
    backgroundColor: THEME.light,
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
