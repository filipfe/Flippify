import { useState, useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { EditIcon } from "../../assets/icons/icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileStackParams } from "../../types/navigation";

export default function EditButton() {
  const { navigate } = useNavigation<NavigationProp<ProfileStackParams>>();
  const { light, ripple, font } = useContext(ThemeContext);
  return (
    <Pressable
      onPress={() => navigate("EditProfile")}
      style={[styles.button, { backgroundColor: light }]}
      android_ripple={{ color: ripple, radius: 24, borderless: true }}
    >
      <EditIcon fill={font} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 24,
    top: 24,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
