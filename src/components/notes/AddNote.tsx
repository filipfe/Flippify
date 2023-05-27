import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import { AddedNoteProps, ImageFile } from "../../types/notes";
import UserCredentials from "../UserCredentials";
import { ResizeIcon } from "../../assets/icons/icons";
import { styles } from "./NoteDetails";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import AddButton from "./add/AddButton";
import PrimaryInput from "../PrimaryInput";

export default function AddNote() {
  const { user } = useContext(AuthContext);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [newNote, setNewNote] = useState<AddedNoteProps>(null!);

  const handleSubmit = async () => {
    const form = new FormData();

    form.append("user", String(user.id));
    form.append("title", newNote.title);
    form.append("desc", newNote.desc);
    // @ts-ignore
    form.append("image", newNote.image);
    form.append("category", String(newNote.category.name));

    await axios.postForm(`${API_URL}/api/notes/add`, form);
  };

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
              {images.length > 0 && (
                <Image
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                  }}
                  source={{
                    uri: images[activeImageIndex].uri,
                  }}
                />
              )}
              {images.length > 0 && (
                <Pressable style={styles.resize}>
                  <ResizeIcon />
                </Pressable>
              )}
              {images.length < 4 && <AddButton setImages={setImages} />}
            </View>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Text style={styles.date}>
              {new Date().toLocaleDateString("default")}
            </Text>
            <PrimaryInput
              field="title"
              label="Tytuł notatki"
              setState={setNewNote}
            />
            <View style={{ marginTop: 16 }}>
              <PrimaryInput
                field="desc"
                label="Opis notatki"
                style={{ minHeight: 128 }}
                setState={setNewNote}
              />
            </View>
            <View style={{ marginTop: 32 }}>
              <UserCredentials user={user} isLiked={false} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
