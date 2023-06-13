import { Pressable, Modal, View, StyleSheet } from "react-native";
import { BackIcon, SearchIcon } from "../../../assets/icons/icons";
import { useState, useContext } from "react";
import PrimaryInput from "../../PrimaryInput";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NoteStackParams } from "../../../types/notes";
import { ThemeContext } from "../../../context/ThemeContext";

export default function SearchButton() {
  const { font, secondary, background } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<NoteStackParams>>();
  const [input, setInput] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const closeModal = () => setSearchActive(false);
  const search = () => {
    navigate("NoteList", { search: input });
    closeModal();
  };

  return (
    <View>
      <Pressable onPress={() => setSearchActive((prev) => !prev)}>
        <SearchIcon height={24} width={24} stroke={font} />
      </Pressable>
      {searchActive && (
        <Modal animationType="slide" onRequestClose={closeModal}>
          <View style={{ ...styles.modal, backgroundColor: background }}>
            <View style={styles.searchWrapper}>
              <Pressable onPress={closeModal}>
                <BackIcon fill={secondary} />
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
    flex: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
