import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import axios from "axios";
import { API_URL } from "@env";
import { Note } from "../types/notes";
import { ThemeContext } from "../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import NoteRef from "../components/notes/NoteRef";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function useNotes(search?: string) {
  const { font } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [didInitialLoad, setDidInitialLoad] = useState(false);
  const [didSearchedLoad, setDidSearchedLoad] = useState(false);
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([
    {
      id: 6,
      desc: "",
      images: [],
      created_at: "",
      user,
      image:
        "https://res.cloudinary.com/dvblmhhhz/image/upload/v1685227642/DivideKnowledge/notes/6-0.png",
      is_liked: true,
      like_count: 1,
      title: "test2",
    },
  ]);

  const load = () => {
    setDidInitialLoad(true);
    setDidSearchedLoad(true);
  };

  useEffect(() => {
    setDidSearchedLoad(false);
    axios
      .get(`${API_URL}/api/notes${search ? `?search=${search}` : ""}`)
      .then((res) => res.data)
      .then((data) => {
        setRecentNotes(data.recent || []);
        setPopularNotes(data.popular || []);
      })
      .finally(load);
  }, [search]);

  const PopularNotes = ({ text = "Popularne teraz" }: { text?: string }) => {
    return (
      <View>
        <Text style={{ ...styles.title, color: font }}>{text}</Text>
        {didInitialLoad ? (
          <FlatList
            style={{ paddingBottom: 24, paddingHorizontal: 24 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popularNotes}
            ItemSeparatorComponent={() => (
              <View style={{ width: 24, height: "100%" }}></View>
            )}
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
            style={{ paddingBottom: 24, paddingHorizontal: 24 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentNotes}
            ItemSeparatorComponent={() => (
              <View style={{ width: 24, height: "100%" }}></View>
            )}
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

  const SearchedNotes = () => {
    return (
      <View>
        <Text style={{ ...styles.title, color: font }}>Szukane “{search}”</Text>
        <View>
          {searchedNotes.map((note) => (
            <NoteRef {...note} key={"Searched" + note.id} />
          ))}
        </View>
      </View>
    );
  };

  return {
    RecentNotes,
    PopularNotes,
    SearchedNotes,
    didInitialLoad,
    didSearchedLoad,
  };
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "ExtraBold",
    marginBottom: 24,
    fontSize: 22,
    paddingHorizontal: 24,
  },
  list: {
    flexDirection: "row",
    position: "relative",
    zIndex: 9999,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
