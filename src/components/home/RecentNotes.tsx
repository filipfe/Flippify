import { useState, useEffect, useContext } from "react";
import { supabase } from "../../hooks/useAuth";
import { Note } from "../../types/notes";
import { FlatList } from "react-native-gesture-handler";
import SmallNoteRef from "../notes/SmallNoteRef";
import { View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function RecentNotes() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await supabase
        .from("notes")
        .select(
          "*, category:categories(id, name, icon), user:profiles(*), views!inner(*)"
        )
        .eq("views.user_id", user.id)
        .order("updated_at", { foreignTable: "views" })
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
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
      renderItem={({ item }) => <SmallNoteRef {...item} key={item.id} />}
    />
  );
}
