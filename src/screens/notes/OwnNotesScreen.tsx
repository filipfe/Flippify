import Layout from "../../components/Layout";
import { View } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { OwnNote } from "../../types/notes";
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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotes = useCallback(
    async (isFirst: boolean) => {
      let query = supabase
        .from("notes")
        .select("*, category:categories(id, name, icon)", { count: "exact" });

      if (category.id) query = query.eq("category_id", category.id);
      if (search) query = query.textSearch("title", route.params.search);

      if (isFirst) query = query.limit(10);
      else query = query.range(page * 10, page * 10 + 9);

      const { data, count } = await query
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      count && setHasMore(page * 10 + 10 < count);
      isFirst
        ? setNotes((data as unknown as OwnNote[]) || [])
        : setNotes((prev) => [
            ...prev,
            ...((data as unknown as OwnNote[]) || []),
          ]);
      setAreLoading(false);
    },
    [search, category, page]
  );

  useEffect(() => {
    setAreLoading(true);
    setPage(0);
    setNotes([]);
    fetchNotes(true);
  }, [route.params]);

  useEffect(() => {
    if (page === 0) return;
    fetchNotes(false);
  }, [page]);

  return areLoading ? (
    <Loader />
  ) : notes.length > 0 ? (
    <Layout paddingHorizontal={0} paddingVertical={0}>
      <FlatList
        data={notes}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
        renderItem={({ item }) => <OwnNoteRef {...item} key={item.id} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        onEndReached={() => hasMore && setPage((prev) => prev + 1)}
        ListFooterComponent={hasMore ? <Loader /> : undefined}
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
