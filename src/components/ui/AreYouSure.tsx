import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

type Props = {
  text: string;
  submitButtonText?: string;
  rejectButtonText?: string;
  isActive: boolean;
  onSubmit: () => any;
  onReject: () => any;
};

export default function AreYouSure({
  text,
  isActive,
  rejectButtonText = "Anuluj",
  submitButtonText = "Potwierdź",
  onSubmit,
  onReject,
}: Props) {
  const { background, font } = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={isActive}
      onRequestClose={onReject}
    >
      <Pressable style={styles.wrapper} onPress={onReject}>
        <View style={[styles.modal, { backgroundColor: background }]}>
          <Text style={[{ color: font }, styles.title]}>{text}</Text>
          <View style={styles.buttonWrapper}>
            <SecondaryButton
              paddingVertical={10}
              paddingHorizontal={0}
              style={{ flex: 1, marginRight: 8 }}
              onPress={onReject}
              text={rejectButtonText}
            />
            <PrimaryButton
              paddingVertical={10}
              paddingHorizontal={0}
              style={{ flex: 1, marginLeft: 8 }}
              onPress={onSubmit}
              text={submitButtonText}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  modal: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 24,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
