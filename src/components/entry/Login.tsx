import { StyleSheet, Text, View, Dimensions, Modal } from "react-native";
import { useState, useContext } from "react";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import RippleButton from "../RippleButton";
import CodePopup from "./CodePopup";

const { width } = Dimensions.get("screen");

export default function Login() {
  const { font, background } = useContext(ThemeContext);
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [codePopupActive, setCodePopupActive] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.title, color: font }}>Zaloguj się</Text>
      <View style={{ flex: 1 }}>
        <PrimaryInput onChangeText={(text) => setEmail(text)} label="Email" />
        <View style={styles.lineWrapper}>
          <View
            style={[styles.lineTextWrapper, { backgroundColor: background }]}
          >
            <Text style={[styles.lineText, { color: font }]}>lub</Text>
          </View>
          <View style={[styles.line, { backgroundColor: font }]} />
        </View>
        <RippleButton onPress={signInWithGoogle}>
          <Text
            style={{
              textAlign: "center",
              color: font,
              fontFamily: "SemiBold",
            }}
          >
            Zaloguj z Google
          </Text>
        </RippleButton>
      </View>
      <PrimaryButton
        text="Zaloguj się"
        active={email.length > 3}
        onPress={() => {
          signInWithEmail(email);
          setCodePopupActive(true);
        }}
      />
      <Modal
        visible={codePopupActive}
        animationType="fade"
        statusBarTranslucent
        transparent
        onRequestClose={() => setCodePopupActive(false)}
      >
        <CodePopup email={email} />
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 96,
    width,
  },
  title: {
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: "#0000FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalText: {
    color: "#FFFFFF",
    fontFamily: "Medium",
  },
  line: {
    width: "100%",
    height: 1,
    borderRadius: 24,
    position: "absolute",
  },
  lineText: {
    fontFamily: "SemiBold",
    fontSize: 12,
  },
  lineTextWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: "relative",
    zIndex: 10,
  },
  lineWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
});
