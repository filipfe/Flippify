import { Pressable, Modal, View, StyleSheet } from "react-native";
import { BackIcon, SearchIcon } from "../../assets/icons/icons";
import { useState } from "react";
import PrimaryInput from "../PrimaryInput";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NoteStackParams } from "../../types/notes";

export default function SearchButton() {
  const { navigate } = useNavigation<NavigationProp<NoteStackParams>>();
  const [input, setInput] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const closeModal = () => setSearchActive(false);
  const search = () => {
    console.log("searching");
    navigate("NoteList", { search: input });
    closeModal();
  };

  return (
    <View>
      <Pressable onPress={() => setSearchActive((prev) => !prev)}>
        <SearchIcon />
      </Pressable>
      {searchActive && (
        <Modal animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modal}>
            <View style={styles.searchWrapper}>
              <Pressable onPress={closeModal}>
                <BackIcon />
              </Pressable>
              <View
                style={{
                  marginLeft: 16,
                  flex: 1,
                }}
              >
                <PrimaryInput
                  blurOnSubmit
                  autoFocus
                  onSubmitEditing={search}
                  onChangeText={(text) => setInput(text)}
                  value={input}
                  placeholder="Wyszukaj notatkę"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
