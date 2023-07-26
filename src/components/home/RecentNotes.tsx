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
    const fetchNotes = async () => {
      const { data } = await supabase.rpc(
        "get_home_content",
        { p_user_id: user.id }
      );
      setNotes((data["latest_notes"] as Note[]) || []);
    };
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
      keyExtractor={(item) => "recent:" + item.id}
    />
  );
}
