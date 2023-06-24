import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import axios from "axios";
import { API_URL } from "@env";
import { Filter, Note } from "../types/notes";
import { ThemeContext } from "../context/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../components/Loader";

export default function useNotes({ category, search }: Filter) {
  const { font } = useContext(ThemeContext);
  const [didInitialLoad, setDidInitialLoad] = useState(false);
  const [areSearchedLoading, setAreSearchedLoading] = useState(false);
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes`)
      .then((res) => res.data)
      .then((data) => {
        setRecentNotes(data.recent || []);
        setPopularNotes(data.popular || []);
      })
      .finally(() => setDidInitialLoad(true));
  }, []);

  useEffect(() => {
    setAreSearchedLoading(true);
    setSearchedNotes([]);
    axios
      .get(`${API_URL}/api/notes/search${search ? `?q=${search}` : ""}`)
      .then((res) => res.data)
      .then((data) => setSearchedNotes(data.items))
      .finally(() => setAreSearchedLoading(false));
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
            contentContainerStyle={{ paddingHorizontal: 24 }}
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
