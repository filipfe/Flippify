import Layout from "../../components/Layout";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { AddedNote, OwnNote } from "../../types/notes";
import axios from "axios";
import { API_URL } from "@env";
import Loader from "../../components/Loader";
import { FlatList } from "react-native-gesture-handler";
import OwnNoteRef from "../../components/notes/own-notes/OwnNoteRef";
import NoContent from "../../components/flashcards/flashlists/NoContent";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NoteStackParams, RootTabParams } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export default function OwnNotesScreen({
  route,
}: NativeStackScreenProps<NoteStackParams, "OwnNotes">) {
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const [areLoading, setAreLoading] = useState(true);
  const [notes, setNotes] = useState<OwnNote[]>([]);
  const { search, category } = route.params;

  useEffect(() => {
    setAreLoading(true);
    const searchArr = [
      category.id && `category_id=${category.id}`,
      search && `q=${search}`,
    ].filter((item) => item);
    const searchQuery = searchArr.length > 0 ? "?" + searchArr.join("&") : "";
    let url = `${API_URL}/api/profile/notes${searchQuery}`;
    const fetchNotes = async () => axios.get(url).then((res) => res.data);
    fetchNotes()
      .then((data) => setNotes(data.items))
      .catch((err) => console.log(err.response.data))
      .finally(() => setAreLoading(false));
  }, [search, category]);

  return areLoading ? (
    <Loader />
  ) : notes.length > 0 ? (
    <Layout>
      <FlatList
        data={notes}
        renderItem={({ item }) => <OwnNoteRef {...item} key={item.id} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </Layout>
  ) : (
    <NoContent
      text="Nie posiadasz żadnych notatek"
      buttonText="Dodaj notatkę"
      onPress={() => navigate("AddNote")}
    />
  );
}
