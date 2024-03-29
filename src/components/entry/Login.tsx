import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useContext } from "react";
import PrimaryInput from "../ui/PrimaryInput";
import PrimaryButton from "../ui/PrimaryButton";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import CodePopup from "./CodePopup";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleIcon, LogoIcon } from "../../assets/icons/icons";

const { width } = Dimensions.get("screen");

export default function Login() {
  const { font, background, secondary, light } = useContext(ThemeContext);
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [codePopupActive, setCodePopupActive] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    setIsLoading(true);
    const error = await signInWithEmail(email);
    !error && setCodePopupActive(true);
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <LogoIcon height={48} width={48} />
        <Text style={[styles.title, { color: font, marginLeft: 16 }]}>
          Zaloguj się
        </Text>
      </View>
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
      <PrimaryButton active={email.length > 3} onPress={handleSubmit}>
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text
            style={{ fontFamily: "SemiBold", lineHeight: 18, color: "#FFF" }}
          >
            Zaloguj się
          </Text>
        )}
      </PrimaryButton>
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
    fontSize: 26,
    lineHeight: 30,
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
