import { RouteProp, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { API_URL } from "@env";
import useNotes from "../../hooks/useNotes";
import { Filter, Note, NoteStackParams } from "../../types/notes";
import Loader from "../Loader";

const NoteList = ({
  route,
}: {
  route: RouteProp<NoteStackParams, "NoteList">;
}) => {
  const location = useNavigationState((state) => state);
  const { didLoad, PopularNotes, RecentNotes } = useNotes(route.params.search);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<Filter>({
    category: "Wszystkie",
    search: "",
  });

  useEffect(() => {
    let categoryStr: string =
      filter.category !== "Wszystkie" ? "&c=" + filter.category : "";
    axios
      .get(`${API_URL}/api/notes${categoryStr}`)
      .then((res) => res.data)
      .then((data) => setNotes([...data.popular, ...data.recent]));
  }, [filter, location]);

  return didLoad ? (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <PopularNotes />
        <RecentNotes />
        {/* {!loading ? (
          notes.map((note) => <NoteRef {...note} key={note.id} />)
        ) : (
          <Loader />
        )} */}
      </View>
    </ScrollView>
  ) : (
    <Loader />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    minHeight: 654,
  },
});

export default NoteList;
