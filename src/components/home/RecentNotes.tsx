import { useState, useEffect } from "react";
import { supabase } from "../../hooks/useAuth";
import { Note } from "../../types/notes";
import { FlatList } from "react-native-gesture-handler";
import SmallNoteRef from "../notes/SmallNoteRef";
import { View } from "react-native";

export default function RecentNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await supabase
        .from("notes")
        .select("*, category:categories(id, name, icon), user:users(*)")
        .limit(8);
      setNotes((data as Note[]) || []);
    }
    fetchNotes();
  }, []);

  return (
    <FlatList
      horizontal
      scrollEnabled
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={notes}
      ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
      renderItem={({ item }) => <SmallNoteRef {...item} key={item.id} />}
    />
  );
}
