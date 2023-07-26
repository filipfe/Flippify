import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import { Filter, Note } from "../types/notes";
import { ThemeContext } from "../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../components/Loader";
import { supabase } from "./useAuth";

export default function useNotes({ category, search }: Filter) {
  const { font } = useContext(ThemeContext);
  const [didInitialLoad, setDidInitialLoad] = useState(false);
  const [areSearchedLoading, setAreSearchedLoading] = useState(false);
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const recent = await supabase
        .from("notes")
        .select("*, category:categories(id, name, icon), user:profiles(*)")
        .order("created_at", { ascending: false })
        .limit(6);
      const popular = await supabase
        .from("notes")
        .select("*, category:categories(id, name, icon), user:profiles(*)")
        .limit(6);
      setRecentNotes((recent.data as Note[]) || []);
      setPopularNotes((popular.data as Note[]) || []);
      setDidInitialLoad(true);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!search) return;
    setAreSearchedLoading(true);
    setSearchedNotes([]);
    const fetchNotes = async () => {
      const { data } = await supabase
        .from("notes")
        .select("*, category:categories(*), user:profiles(*)")
        .textSearch("title", search);
      setSearchedNotes((data as Note[]) || []);
      setAreSearchedLoading(false);
    };
    fetchNotes();
  }, [search]);

  const PopularNotes = ({ text = "Popularne teraz" }: { text?: string }) => {
    return (
      <View>
        <Text style={{ ...styles.title, color: font }}>{text}</Text>
        {didInitialLoad ? (
          <FlatList
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 24,
            }}
            ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
            showsHorizontalScrollIndicator={false}
            data={popularNotes}
            renderItem={({ item }) => (
              <SmallNoteRef {...item} key={`Popular:${item.id}`} />
            )}
            keyExtractor={(note) => "Popular:" + note.id}
          />
        ) : (
          <Loader />
        )}
      </View>
    );
  };

  const RecentNotes = ({ text = "Ostatnio dodane" }: { text?: string }) => {
    return (
      <View>
        <Text style={{ ...styles.title, color: font }}>{text}</Text>
        {didInitialLoad ? (
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentNotes}
            renderItem={({ item }) => (
              <SmallNoteRef {...item} key={`Popular:${item.id}`} />
            )}
            keyExtractor={(note) => "Recent:" + note.id}
          />
        ) : (
          <Loader />
        )}
      </View>
    );
  };

  return {
    RecentNotes,
    PopularNotes,
    areSearchedLoading,
    searchedNotes,
    didInitialLoad,
  };
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "ExtraBold",
    marginBottom: 24,
    fontSize: 22,
    paddingHorizontal: 24,
  },
});
