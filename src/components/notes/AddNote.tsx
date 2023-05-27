import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import PrimaryInput from "../PrimaryInput";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../Loader";
import SelectDropdown from "react-native-select-dropdown";
import { AuthContext } from "../../context/AuthContext";
import { AddedNoteProps } from "../../types/notes";
import { Category } from "../../types/general";

export default function AddNote() {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState<string | boolean>("");
  const [newNote, setNewNote] = useState<AddedNoteProps>(null!);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data));
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let imageUri = result.assets[0].uri;
      let imageName = imageUri.split("/").pop();
      let match = /\.(\w+)$/.exec(imageName ? imageName : "");
      let type: string = match ? `image/${match[1]}` : `image`;
      let image = {
        uri: imageUri,
        name: imageName ? imageName : "",
        type,
      };
      setNewNote((prev) => ({ ...prev, image }));
    }
  };

  const handleSubmit = async () => {
    setStatus("loading");
    const form = new FormData();

    form.append("user", String(user.id));
    form.append("title", newNote.title);
    form.append("desc", newNote.desc);
    // @ts-ignore
    form.append("image", newNote.image);
    form.append("category", String(newNote.category.name));

    try {
      const response = await axios.postForm(`${API_URL}/api/notes/add`, form);
      if (response.status === (201 || 200)) return setStatus(true);
    } catch (err: any) {
      setStatus("Nie ma takiej kategorii!");
    }
  };

  if (status === "loading") return <Loader />;

  return (
    <ScrollView>
      <TouchableOpacity onPress={pickImage}>
        <Text>Wybierz zdjęcie</Text>
      </TouchableOpacity>
      {newNote.image.uri && (
        <Image
          style={{ resizeMode: "contain", height: 160, width: "100%" }}
          source={{
            uri: newNote.image.uri,
          }}
        />
      )}
      <PrimaryInput
        field="title"
        value={newNote.title}
        setState={setNewNote}
        label="Tytuł"
      />
      {newNote.title.length > 16 && (
        <Text>Tytuł nie może przekraczać 16 znaków!</Text>
      )}
      <PrimaryInput
        field="desc"
        value={newNote.desc}
        setState={setNewNote}
        label="Opis"
      />
      <Text>{newNote.desc.length} / 50</Text>
      {categories.length > 0 ? (
        <SelectDropdown
          data={categories.map((item) => item)}
          buttonStyle={{}}
          dropdownStyle={{}}
          defaultButtonText="Kategoria"
          onSelect={(item) =>
            setNewNote((prev) => ({ ...prev, category: item }))
          }
          buttonTextAfterSelection={(item) => item.name}
          rowTextForSelection={(item) => item.name}
        />
      ) : (
        <Loader />
      )}
      {status && typeof status === "string" && <Text>{status}</Text>}
      <PrimaryButton
        onPress={handleSubmit}
        active={
          newNote.title !== "" &&
          newNote.image.uri !== "" &&
          newNote.category.name !== "" &&
          newNote.title.length < 16 &&
          newNote.title.length < 50
        }
        text="Zatwierdź"
      />
      <Modal visible={status === true} animationType="fade">
        <View>
          <Image
            style={{ resizeMode: "contain", height: 160 }}
            source={require("../../assets/card_created.png")}
          />
          <Text>Notatka została utworzona</Text>
          <Text>
            Masz do niej dostęp z panelu swoich notatek, zbieraj polubienia i
            dodawaj kolejne notatki. <Text>Życzymy owocnej nauki!</Text>
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
}
