import Layout from "../../components/Layout";
import { View } from "react-native";
import { useState, useEffect, useContext } from "react";
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
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

export default function OwnNotesScreen({
  route,
}: NativeStackScreenProps<NoteStackParams, "OwnNotes">) {
  const { user } = useContext(AuthContext);
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  const [areLoading, setAreLoading] = useState(true);
  const [notes, setNotes] = useState<OwnNote[]>([]);
  const { search, category } = route.params;

  useEffect(() => {
    setAreLoading(true);
    const fetchNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*, category:categories(*)")
        .eq("user_id", 1);
      setNotes((data as OwnNote[]) || []);
      setAreLoading(false);
    };
    fetchNotes();
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
