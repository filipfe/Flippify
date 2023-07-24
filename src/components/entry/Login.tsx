import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import Loader from "../Loader";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthFormContext } from "../../providers/AuthFormProvider";
import { AuthContext } from "../../context/AuthContext";
import SecondaryButton from "../SecondaryButton";
import { ThemeContext } from "../../context/ThemeContext";
import { LoginData } from "../../const/auth";
import RippleButton from "../RippleButton";
import Recovery from "../../screens/entry/Recovery";

const { width } = Dimensions.get("screen");

export default function Login() {
  const { font, primary, secondary } = useContext(ThemeContext);
  const { signInWithPassword, signInWithGoogle } = useContext(AuthContext);
  const { setAuthFormIndex } = useContext(AuthFormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryActive, setRecoveryActive] = useState(false);
  const [userData, setUserData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setIsLoading(true);
    signInWithPassword(userData);
  };

  if (isLoading)
    return (
      <View style={{ width }}>
        <Loader />
      </View>
    );

  if (recoveryActive)
    return <Recovery close={() => setRecoveryActive(false)} />;

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.title, color: font }}>Zaloguj się</Text>
      <View style={{ flex: 1 }}>
        <PrimaryInput
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, email: text }))
          }
          label="Email"
        />
        <PrimaryInput
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, password: text }))
          }
          label="Hasło"
          secureTextEntry={true}
        />
        <View style={styles.recoverWrapper}>
          <Text style={{ ...styles.recoverText, color: font, opacity: 0.8 }}>
            Zapomniałeś hasła?{" "}
          </Text>
          <TouchableOpacity onPress={() => setRecoveryActive(true)}>
            <Text style={[styles.recoverText, { color: primary }]}>
              Odzyskaj hasło
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.line, { backgroundColor: secondary }]}>
          <Text style={[styles.lineText, { color: secondary }]}>lub</Text>
        </View>
        <RippleButton onPress={signInWithGoogle}>
          <Text>Zaloguj z Google</Text>
        </RippleButton>
      </View>
      <View>
        <SecondaryButton
          text="Chcę założyć konto"
          onPress={() => setAuthFormIndex(0)}
        />
        <View style={styles.submitButton}>
          <PrimaryButton
            text="Zaloguj się"
            active={userData.email.length > 3 && userData.password.length > 1}
            onPress={handleSubmit}
          />
        </View>
      </View>
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
  form: {
    flex: 1,
  },
  recoverWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  recoverText: { fontFamily: "SemiBold", fontSize: 12 },
  submitButton: { marginTop: 16 },
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
    justifyContent: "center",
    alignItems: "center",
  },
  lineText: {
    fontFamily: "Medium",
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
