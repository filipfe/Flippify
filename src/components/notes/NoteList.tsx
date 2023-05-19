import { NavigationProp, useNavigationState } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import Loader from "../Loader";
import { API_URL } from "@env";
import useNotes from "../../hooks/useNotes";
import { Filter, Note, NoteStackParams } from "../../types/notes";
import NoteFilter from "./NoteFilter";
import NoteRef from "./NoteRef";

type NoteRefNavigationProp = NavigationProp<NoteStackParams, "NoteList">;

const NoteList = ({ navigation }: { navigation: NoteRefNavigationProp }) => {
  const location = useNavigationState((state) => state);
  const tw = useTailwind();
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
    <>
      <ScrollView style={tw("pt-6 px-6 flex-1 bg-white")}>
        {didPopularLoad && <PopularNotes />}
        {didRecentLoad && <RecentNotes />}
        <NoteFilter filter={filter} setFilter={setFilter} />
        {!loading ? (
          notes.map((note) => <NoteRef {...note} key={note.id} />)
        ) : (
          <Loader />
        )}
      </ScrollView>
      <Pressable
        style={tw("absolute right-6 bottom-6")}
        onPress={() => navigation.navigate("AddNote")}
      >
        <View
          style={tw(
            "rounded-full w-16 h-16 bg-primary items-center justify-center z-10"
          )}
        >
          <Text style={{ fontFamily: "Bold", ...tw("text-4xl text-white") }}>
            +
          </Text>
        </View>
        <View
          style={tw(
            `absolute left-0 right-0 h-[2.5rem] bg-darkPrimary -bottom-[0.4rem] rounded-b-full`
          )}
        />
      </Pressable>
    </>
  );
};

export default NoteList;
