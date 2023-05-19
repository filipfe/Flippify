import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Note, NoteRefNavigationProp } from "../../types/notes";

const NoteRef = (props: Note) => {
  const tw = useTailwind();
  const navigation = useNavigation<NoteRefNavigationProp>();
  const { title, desc, likes } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Note", { ...props })}
      style={tw("w-full overflow-hidden rounded-xl bg-white mb-6")}
    >
      <Image
        style={tw("h-36 w-full")}
        source={{
          uri: props.image,
        }}
      />
      <View style={tw("flex-row justify-between items-center p-4")}>
        <View>
          <Text style={{ fontFamily: "Bold", ...tw("text-xl") }}>{title}</Text>
          <Text style={{ fontFamily: "Medium", ...tw("text-p") }}>{desc}</Text>
        </View>
        <View style={tw("flex-row items-center")}>
          <Text style={tw("mr-1")}>❤</Text>
          <Text style={{ fontFamily: "Bold", ...tw("text-lg") }}>{likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NoteRef;
