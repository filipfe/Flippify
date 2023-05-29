import { Pressable, View } from "react-native";
import SearchButton from "./SearchButton";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { useNavigation } from "@react-navigation/native";
import { NoteRefNavigationProp } from "../../types/notes";

export default function HeaderMenu() {
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <SearchButton />
      <Pressable
        style={{ marginLeft: 16, marginRight: 8 }}
        onPress={() => navigate("AddNote")}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          colors={linearGradient}
          style={{
            height: 32,
            width: 32,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              color: "#FFF",
              fontSize: 18,
              lineHeight: 18,
            }}
          >
            +
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
