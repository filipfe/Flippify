import { Pressable, Modal, View, StyleSheet, Text } from "react-native";
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
import CategoryPicker from "../add-note/components/CategoryPicker";
import { initialCategory } from "../../../const/flashcards";
import { Category } from "../../../types/general";
import PrimaryButton from "../../PrimaryButton";

export default function FilterButton() {
  const [activeCategory, setActiveCategory] =
    useState<Category>(initialCategory);
  const { font, background, secondary } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<NoteStackParams>>();
  const { params } = useRoute<RouteProp<NoteStackParams, "NoteList">>();
  const [filterActive, setFilterActive] = useState(false);
  const closeModal = () => setFilterActive(false);

  const search = () => {
    navigate("NoteList", { ...params, category: initialCategory });
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
            <View>
              <View style={styles.searchWrapper}>
                <Pressable style={{ marginRight: 24 }} onPress={closeModal}>
                  <BackIcon fill={font} />
                </Pressable>
                <Text style={{ ...styles.title, color: font }}>Filtruj</Text>
              </View>
              <CategoryPicker
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </View>
            <PrimaryButton onPress={search} width={"100%"} text={"Zatwierdź"} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 22,
  },
});
