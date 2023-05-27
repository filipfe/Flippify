import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";
import { linearGradient } from "../../../const/styles";
import { THEME } from "../../../const/theme";
import * as ImagePicker from "expo-image-picker";
import { NoteAddButtonProps } from "../../../types/notes";

export default function AddButton({ setImages }: NoteAddButtonProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let imageUri = result.assets[0].uri;
      let imageName = imageUri.split("/").pop();
      let match = /\.(\w+)$/.exec(imageName ? imageName : "");
      let type: string = match ? `image/${match[1]}` : `image`;
      let image = {
        uri: imageUri,
        name: imageName ? imageName : "",
        type,
      };
      setImages((prev) => [...prev, image]);
    }
  };
  return (
    <Pressable
      style={{
        marginHorizontal: 16,
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -24 }],
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        colors={linearGradient}
        style={{
          height: 48,
          width: 48,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 48,
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            color: "#FFF",
            lineHeight: 18,
            fontSize: 18,
          }}
        >
          +
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
