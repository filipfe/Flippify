import { useNavigationState } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { API_URL } from "@env";
import useNotes from "../../hooks/useNotes";
import { Filter, Note } from "../../types/notes";

const NoteList = () => {
  const location = useNavigationState((state) => state);
  const { didRecentLoad, didPopularLoad, PopularNotes, RecentNotes } =
    useNotes();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<Filter>({
    category: "Wszystkie",
  });

  useEffect(() => {
    setLoading(true);
    let categoryStr: string =
      filter.category !== "Wszystkie" ? "&c=" + filter.category : "";
    axios
      .get(`${API_URL}/api/notes${categoryStr}`)
      .then((res) => res.data)
      .then((data) => setNotes([...data.popular, ...data.recent]))
      .finally(() => setLoading(false));
  }, [filter, location]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        {didPopularLoad && <PopularNotes />}
        {didRecentLoad && <RecentNotes />}
        {/* {!loading ? (
          notes.map((note) => <NoteRef {...note} key={note.id} />)
        ) : (
          <Loader />
        )} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    minHeight: 1024,
  },
});

export default NoteList;
