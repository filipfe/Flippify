import { View } from "react-native";
import UserCredentials from "../UserCredentials";
import { ProposedUser } from "../../types/home";
import { FlatList } from "react-native-gesture-handler";
import SmallNoteRef from "../notes/SmallNoteRef";

export default function UserSection({ notes, ...user }: ProposedUser) {
  return (
    <View style={{ paddingVertical: 24 }}>
      <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
        <UserCredentials user={user} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={notes}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        renderItem={({ item }) => (
          <SmallNoteRef {...item} user={user} key={item.id} />
        )}
      />
    </View>
  );
}
