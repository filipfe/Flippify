import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import RippleButton from "../RippleButton";
import CodePopup from "./CodePopup";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleIcon } from "../../assets/icons/icons";

const { width } = Dimensions.get("screen");

export default function Login() {
  const { font, background, secondary, light } = useContext(ThemeContext);
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [codePopupActive, setCodePopupActive] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{ ...styles.title, color: font }}>Zaloguj się</Text>
      <View style={{ flex: 1 }}>
        <PrimaryInput onChangeText={(text) => setEmail(text)} label="Email" />
        <View style={styles.lineWrapper}>
          <View
            style={[styles.lineTextWrapper, { backgroundColor: background }]}
          >
            <Text style={[styles.lineText, { color: secondary }]}>lub</Text>
          </View>
          <View style={[styles.line, { backgroundColor: light }]} />
        </View>
        <Pressable
          style={[styles.googleButton, { backgroundColor: light }]}
          onPress={signInWithGoogle}
        >
          <View style={{ marginRight: 16 }}>
            <GoogleIcon />
          </View>
          <Text
            style={{
              color: font,
              fontFamily: "SemiBold",
              lineHeight: 16,
            }}
          >
            Zaloguj z Google
          </Text>
        </Pressable>
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
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 36,
    width,
  },
  title: {
    fontFamily: "SemiBold",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 24,
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
    height: 3,
    borderRadius: 24,
    position: "absolute",
  },
  lineText: {
    fontFamily: "SemiBold",
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
    marginVertical: 16,
  },
  googleButton: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 16,
  },
});
