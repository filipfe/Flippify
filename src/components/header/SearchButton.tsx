import { Pressable, Modal, View, StyleSheet, TextInput } from "react-native";
import { BackIcon, SearchIcon } from "../../assets/icons/icons";
import { useState, useContext, useRef, useEffect } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { FilterComponentProps, NoteStackParams } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function SearchButton({
  route,
  dataType,
}: Omit<FilterComponentProps, "topicActive">) {
  const timer = useRef<any>(null!);
  const inputRef = useRef<TextInput>(null!);
  const { params } = useRoute<RouteProp<any>>();
  const { font, secondary, background, ripple, light } =
    useContext(ThemeContext);
  const { push } = useNavigation<NativeStackNavigationProp<any>>();
  const [input, setInput] = useState(params?.search || "");
  const [searchActive, setSearchActive] = useState(false);
  const closeModal = () => setSearchActive(false);
  const search = () => {
    closeModal();
    push(route, { ...params, search: input });
  };

  useEffect(() => {
    inputRef.current &&
      searchActive &&
      (timer.current = setTimeout(() => {
        inputRef.current.focus();
      }, 100));
    return () => {
      clearTimeout(timer.current);
    };
  }, [inputRef.current, searchActive]);

  return (
    <View>
      <Pressable
        android_ripple={{ color: ripple, radius: 24, borderless: true }}
        onPress={() => setSearchActive((prev) => !prev)}
      >
        <SearchIcon height={24} width={24} stroke={font} />
      </Pressable>
      <Modal
        animationType="fade"
        visible={searchActive}
        onRequestClose={closeModal}
      >
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
              <TextInput
                onSubmitEditing={search}
                onChangeText={(text) => setInput(text)}
                value={input}
                placeholder={
                  dataType === "note" ? "Wyszukaj notatkę" : "Wyszukaj fiszkę"
                }
                ref={(ref) => ref && (inputRef.current = ref)}
                placeholderTextColor={secondary}
                style={{
                  fontFamily: "SemiBold",
                  paddingHorizontal: 24,
                  paddingVertical: 10,
                  borderRadius: 16,
                  width: "100%",
                  alignItems: "flex-start",
                  backgroundColor: light,
                  color: font,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
