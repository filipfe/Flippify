import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { API_URL } from "@env";
import { Note, NoteStackParams } from "../../types/notes";
import { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { initialNote } from "../../const/notes";
import { shadowPrimary } from "../../styles/general";
import UserCredentials from "../UserCredentials";
import ImageHandler from "./ImageHandler";
import useNoteImages from "../../hooks/useNoteImages";
import NoteImageIndex from "./NoteImageIndex";
import { ThemeContext } from "../../context/ThemeContext";

type NoteRouteProp = RouteProp<NoteStackParams, "Note">;

export default function NoteDetails({ route }: { route: NoteRouteProp }) {
  const { font, secondary, background } = useContext(ThemeContext);
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Note>(initialNote);
  const [isLiked, setIsLiked] = useState(false);
  const { title, created_at, user, image } = details;
  const { activeIndex, images, setImages } = useNoteImages<string>();

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
        setImages(data.images);
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
            backgroundColor: background,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingHorizontal: 24,
          }}
        >
          <View style={{ marginTop: -132, marginBottom: 32 }}>
            <View
              style={{ ...styles.imageWrapper, backgroundColor: background }}
            >
              <ImageHandler
                // images={images.map((image) => ({
                //   uri: image,
                //   name: image,
                //   type: "",
                // }))}
                images={[{ uri: image, name: image, type: "" }]}
              />
              {[""].length > 1 && (
                <NoteImageIndex
                  // images={images}
                  images={[{ uri: image, name: image, type: "" }]}
                  activeIndex={activeIndex}
                />
              )}
            </View>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Text style={{ ...styles.date, color: secondary }}>
              {new Date(created_at).toLocaleDateString("default")}
            </Text>
            <Text style={{ ...styles.noteTitle, color: font }}>{title}</Text>
            <Text style={{ ...styles.noteDesc, color: secondary }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              assumenda obcaecati, harum molestiae iusto accusamus facilis
              asperiores quisquam ad, rerum totam aut corporis neque. Voluptate
              nesciunt obcaecati natus? Deleniti, numquam!
            </Text>
            <View style={{ marginTop: 32 }}>
              <UserCredentials
                user={user}
                isLiked={isLiked}
                handleLike={handleLike}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 232,
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
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    ...shadowPrimary,
  },
  noteDescWrapper: {
    flex: 1,
  },
  date: {
    fontFamily: "ExtraBold",
    marginBottom: 4,
  },
  noteTitle: {
    fontFamily: "ExtraBold",
    fontSize: 24,
    marginBottom: 8,
  },
  noteDesc: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Medium",
    marginTop: 8,
  },
});
