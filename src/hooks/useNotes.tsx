import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import axios from "axios";
import { API_URL } from "@env";
import { Note, NoteStackParams } from "../types/notes";
import { THEME } from "../const/theme";

export default function useNotes() {
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const navigation =
    useNavigation<NavigationProp<NoteStackParams, "NoteList">>();
  const location = useNavigationState((state) => state);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/notes`)
      .then((res) => res.data)
      .then((data) => {
        setRecentNotes(data.recent);
        setPopularNotes(data.popular);
      });
  }, [location]);

  const PopularNotes = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Popularne teraz</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.list}>
            {popularNotes.map((note) => (
              <SmallNoteRef {...note} key={`Popular:${note.id + note.title}`} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const RecentNotes = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Ostatnio dodane</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.list}>
            {recentNotes.map((note) => (
              <SmallNoteRef {...note} key={`Recent:${note.id + note.title}`} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return {
    didPopularLoad: popularNotes.length > 0,
    didRecentLoad: recentNotes.length > 0,
    RecentNotes,
    PopularNotes,
  };
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  title: {
    fontFamily: "ExtraBold",
    marginBottom: 24,
    fontSize: 22,
    color: THEME.font,
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
