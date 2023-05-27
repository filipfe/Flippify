import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import { THEME } from "../../const/theme";

export default function Login() {
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
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => login(res.data))
      .catch((err) => setError(err.response.data.detail))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Loader />;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Zaloguj się</Text>
      <ScrollView style={{ flex: 1 }}>
        <PrimaryInput field="email" setState={setUserData} label="Email" />
        <PrimaryInput
          field="password"
          setState={setUserData}
          label="Hasło"
          secured={true}
        />
        <View style={styles.recoverWrapper}>
          <TouchableOpacity style={styles.recoverButton}>
            <Text style={styles.recoverText}>Odzyskaj hasło</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <SecondaryButton
          text="Chcę założyć konto"
          onPress={() => setAuthFormIndex(0)}
        />
        <View style={styles.submitButton}>
          <PrimaryButton text="Zaloguj się" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Bold",
    textAlign: "center",
    color: THEME.font,
    fontSize: 24,
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  recoverWrapper: { flexDirection: "row", justifyContent: "flex-end" },
  recoverButton: { marginTop: 2, marginLeft: 2 },
  recoverText: { color: THEME.font, fontFamily: "Bold" },
  submitButton: { marginTop: 20 },
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
