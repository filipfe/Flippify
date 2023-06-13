import { RouteProp, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { API_URL } from "@env";
import useNotes from "../../hooks/useNotes";
import { Filter, Note, NoteStackParams } from "../../types/notes";
import Loader from "../Loader";
import { ThemeContext } from "../../context/ThemeContext";

const NoteList = ({
  route,
}: {
  route: RouteProp<NoteStackParams, "NoteList">;
}) => {
  const { background } = useContext(ThemeContext);
  const location = useNavigationState((state) => state);
  const {
    didInitialLoad,
    didSearchedLoad,
    SearchedNotes,
    PopularNotes,
    RecentNotes,
  } = useNotes(route.params.search);
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [filter, setFilter] = useState<Filter>({
  //   category: "Wszystkie",
  //   search: "",
  // });

  // useEffect(() => {
  //   let categoryStr: string =
  //     filter.category !== "Wszystkie" ? "&c=" + filter.category : "";
  //   axios
  //     .get(`${API_URL}/api/notes${categoryStr}`)
  //     .then((res) => res.data)
  //     .then((data) => setNotes([...data.popular, ...data.recent]));
  // }, [filter, location]);

  return didInitialLoad ? (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.wrapper, backgroundColor: background }}>
        {route.params.search && didSearchedLoad && <SearchedNotes />}
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

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    minHeight: height,
  },
});

export default NoteList;
