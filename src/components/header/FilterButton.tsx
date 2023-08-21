import { Pressable, Modal, View, StyleSheet, Text } from "react-native";
import { BackIcon, FilterIcon } from "../../assets/icons/icons";
import { useState, useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import CategoryPicker from "../filter/CategoryPicker";
import { initialCategory, initialTopic } from "../../const/flashcards";
import PrimaryButton from "../PrimaryButton";
import { FilterComponentProps } from "../../types/navigation";
import TopicPicker from "../filter/TopicPicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Filter } from "../../types/general";

export default function FilterButton({
  route,
}: Omit<FilterComponentProps, "inputPlaceholder">) {
  const [filterParams, setFilterParams] = useState<Filter>({
    category: initialCategory,
    topic: initialTopic,
    search: "",
  });
  const [filterActive, setFilterActive] = useState(false);
  const { font, background, ripple } = useContext(ThemeContext);
  const { push } = useNavigation<NativeStackNavigationProp<any>>();
  const closeModal = () => setFilterActive(false);

  const search = () => {
    push(route, {
      category: filterParams.category,
      topic: filterParams.topic,
      search: filterParams.search,
    });
    closeModal();
  };

  return (
    <View>
      <Pressable
        android_ripple={{ color: ripple, radius: 24, borderless: true }}
        onPress={() => setFilterActive((prev) => !prev)}
      >
        <FilterIcon height={28} width={26} fill={font} />
      </Pressable>
      <Modal
        animationType="fade"
        visible={filterActive}
        onRequestClose={closeModal}
      >
        <View style={{ ...styles.modal, backgroundColor: background }}>
          <View>
            <View style={styles.searchWrapper}>
              <Pressable style={{ marginRight: 24 }} onPress={closeModal}>
                <BackIcon fill={font} />
              </Pressable>
              <Text style={{ ...styles.title, color: font }}>Filtruj</Text>
            </View>
            <View style={{ marginTop: 32 }}>
              <CategoryPicker
                active={filterParams.category}
                onChange={(category) =>
                  setFilterParams((prev) => ({ ...prev, category }))
                }
              />
            </View>
            <View style={{ marginTop: 32 }}>
              <TopicPicker
                category={filterParams.category}
                active={filterParams.topic}
                onChange={(topic) =>
                  setFilterParams((prev) => ({ ...prev, topic }))
                }
              />
            </View>
          </View>
          <PrimaryButton onPress={search} width={"100%"} text={"Zatwierdź"} />
        </View>
      </Modal>
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
