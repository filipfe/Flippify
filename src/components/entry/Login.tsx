import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import Loader from "../Loader";
import { API_URL } from "@env";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthFormContext } from "../../providers/AuthFormProvider";
import { AuthContext } from "../../context/AuthContext";
import SecondaryButton from "../SecondaryButton";
import { ThemeContext } from "../../context/ThemeContext";

const { width } = Dimensions.get("screen");

export default function Login() {
  const { font, primary } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const { setAuthFormIndex } = useContext(AuthFormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(
        `${API_URL}/api/login`,
        JSON.stringify({
          login: userData.email,
          password: userData.password,
        })
      )
      .then((res) => login(res.data))
      .catch((err) => setError(err.response.data.detail))
      .finally(() => setIsLoading(false));
  };

  if (isLoading)
    return (
      <View style={{ width }}>
        <Loader />
      </View>
    );

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.title, color: font }}>Zaloguj się</Text>
      <ScrollView style={{ flex: 1 }}>
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
          <TouchableOpacity>
            <Text style={[styles.recoverText, { color: primary }]}>
              Odzyskaj hasło
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});
