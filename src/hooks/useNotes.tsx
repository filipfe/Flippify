import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { ScrollView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import SmallNoteRef from "../components/notes/SmallNoteRef";
import { NoteStackParams } from "../screens/NotesScreen";
import { NoteProps } from "../components/notes/Note";
import { useTailwind } from "tailwind-rn/dist";
import axios from "axios";
import { API_URL } from "@env";

export default function useNotes() {
  const [popularNotes, setPopularNotes] = useState<NoteProps[]>([]);
  const [recentNotes, setRecentNotes] = useState<NoteProps[]>([]);
  const tw = useTailwind();
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
      <View style={tw("mb-6")}>
        <Text style={{ fontFamily: "Bold", ...tw("mb-4 text-lg") }}>
          Popularne notatki
        </Text>
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
      <View style={tw("mb-6")}>
        <Text style={{ fontFamily: "Bold", ...tw("mb-4 text-lg") }}>
          Ostatnio dodane notatki
        </Text>
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
