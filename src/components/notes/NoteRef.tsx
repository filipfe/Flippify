import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";

const NoteRef = (props: Note) => {
  const navigation = useNavigation<NoteRefNavigationProp>();
  const { title, desc, likes } = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Note", { ...props })}>
      <Image
        source={{
          uri: props.image,
        }}
      />
      <View>
        <View>
          <Text>{title}</Text>
          <Text>{desc}</Text>
        </View>
        <View>
          <Text>❤</Text>
          <Text>{likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NoteRef;
