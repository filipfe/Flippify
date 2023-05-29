import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { linearGradient } from "../../../const/styles";
import * as ImagePicker from "expo-image-picker";
import { NoteAddButtonProps } from "../../../types/notes";
import { shadowPrimary } from "../../../styles/general";

export default function AddButton({ addNewImage }: NoteAddButtonProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageName = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(imageName ? imageName : "");
      const type: string = match ? `image/${match[1]}` : `image`;
      const image = {
        uri: imageUri,
        name: imageName || "",
        type,
      };
      addNewImage(image);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        position: "absolute",
        top: "50%",
        width: 48,
        height: 48,
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
          ...shadowPrimary,
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            color: "#FFF",
            lineHeight: 20,
            fontSize: 22,
          }}
        >
          +
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
