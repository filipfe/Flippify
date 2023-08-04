import { FlatList, StyleSheet, Text, View } from "react-native";
import { Note } from "../../types/notes";
import SmallNoteRef from "./SmallNoteRef";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  title: string;
  noteList: Note[];
};

export default function NoteSection({ title, noteList }: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <View>
      <Text style={{ ...styles.title, color: font }}>{title}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
        data={noteList}
        renderItem={({ item }) => (
          <SmallNoteRef {...item} key={`Popular:${item.id}`} />
        )}
        keyExtractor={(note) => "Popular:" + note.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "SemiBold",
    marginBottom: 24,
    fontSize: 22,
    paddingHorizontal: 24,
  },
});
