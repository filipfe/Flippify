import { useContext, useState } from "react";
import { View, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ThemeContext } from "../../context/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types/navigation";
import { BackIcon } from "../../assets/icons/icons";

export default function SearchInput() {
  const { navigate, goBack } = useNavigation<NavigationProp<RootStackParams>>();
  const { secondary, font, light, ripple } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const search = () => navigate("SearchScreen", { input });
  return (
    <View
      style={{
        backgroundColor: light,
        borderRadius: 12,
        paddingRight: 24,
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Pressable
        android_ripple={{ color: ripple, radius: 24, borderless: true }}
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
        onPress={goBack}
      >
        <BackIcon height={12} width={12} fill={font} />
      </Pressable>
      <TextInput
        onSubmitEditing={search}
        onChangeText={(text) => setInput(text)}
        value={input}
        placeholder={"Wyszukaj fiszkolistę"}
        placeholderTextColor={secondary}
        autoFocus
        style={{
          fontFamily: "SemiBold",
          flex: 1,
          height: "100%",
          color: font,
        }}
      />
    </View>
  );
}
