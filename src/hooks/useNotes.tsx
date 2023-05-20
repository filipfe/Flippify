import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import axios from "axios";
import { API_URL } from "@env";
import { Note, NoteStackParams } from "../types/notes";

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
        <Text style={styles.title}>Popularne notatki</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {popularNotes.map((note) => (
            <SmallNoteRef
              onPress={() => navigation.navigate("Note", { ...note })}
              style="mr-6"
              {...note}
              key={note.id + note.title}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const RecentNotes = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Ostatnio dodane notatki</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recentNotes.map((note) => (
            <SmallNoteRef
              onPress={() => navigation.navigate("Note", { ...note })}
              style="mr-6"
              {...note}
              key={note.id + note.title}
            />
          ))}
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
    fontFamily: "Bold",
    marginBottom: 16,
    fontSize: 18,
  },
});
