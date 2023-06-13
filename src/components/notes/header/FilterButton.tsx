import { Pressable, Modal, View, StyleSheet } from "react-native";
import { BackIcon, FilterIcon } from "../../../assets/icons/icons";
import { useState, useContext } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NoteStackParams } from "../../../types/notes";
import { ThemeContext } from "../../../context/ThemeContext";

export default function FilterButton() {
  const { font, background, secondary } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<NoteStackParams>>();
  const { params } = useRoute<RouteProp<NoteStackParams, "NoteList">>();
  const [filterActive, setFilterActive] = useState(false);
  const closeModal = () => setFilterActive(false);

  const search = () => {
    navigate("NoteList", { ...params, category_id: 0 });
    closeModal();
  };

  return (
    <View>
      <Pressable onPress={() => setFilterActive((prev) => !prev)}>
        <FilterIcon height={28} width={26} fill={font} />
      </Pressable>
      {filterActive && (
        <Modal animationType="slide" onRequestClose={closeModal}>
          <View style={{ ...styles.modal, backgroundColor: background }}>
            <View style={styles.searchWrapper}>
              <Pressable onPress={closeModal}>
                <BackIcon fill={secondary} />
              </Pressable>
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
