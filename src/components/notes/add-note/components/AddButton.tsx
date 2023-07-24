import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { linearGradient } from "../../../../const/styles";
import * as ImagePicker from "expo-image-picker";
import { NoteAddButtonProps } from "../../../../types/notes";
import { shadowPrimary } from "../../../../styles/general";
import { PlusIcon } from "../../../../assets/icons/icons";

export default function AddButton({
  size = 48,
  addNewImage,
}: NoteAddButtonProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log(imageUri);
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
      activeOpacity={0.6}
      style={{
        position: "absolute",
        top: "50%",
        width: size,
        height: size,
        transform: [{ translateY: -24 }],
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        colors={linearGradient}
        style={{
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: size,
          ...shadowPrimary,
        }}
      >
        <PlusIcon width={size / 3} />
      </LinearGradient>
    </TouchableOpacity>
  );
}
