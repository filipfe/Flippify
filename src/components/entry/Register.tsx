import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "@env";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthFormContext } from "../../providers/AuthFormProvider";
import SecondaryButton from "../SecondaryButton";
import { styles } from "./Login";
import { THEME } from "../../const/theme";

export default function Register() {
  const { setAuthFormIndex } = useContext(AuthFormContext);
  const [status, setStatus] = useState<string | boolean>("");
  const [confPassword, setConfPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    setStatus("loading");
    if (userData.password !== confPassword)
      return setStatus("Hasła się nie zgadzają!");
    axios
      .post(`${API_URL}/api/signup`, JSON.stringify(userData))
      .then(() => setModal(true))
      .catch(() => setStatus("Error"));
  };

  const handleCodeSubmit = () => {
    axios
      .post(
        `${API_URL}/api/verify`,
        JSON.stringify({
          email: userData.email,
          code: parseInt(verificationCode),
        })
      )
      .then(() => setAuthFormIndex(1))
      .catch((err) => alert(err));
  };

  if (status === "Registered") return <Text>Zarejestrowano</Text>;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        Załóż <Text style={{ color: THEME.primary }}>bezpłatne</Text> konto
      </Text>
      <ScrollView style={styles.form}>
        <PrimaryInput
          label="Nazwa użytkownika"
          onChangeText={(text) =>
            setUserData((prev) => ({ ...prev, username: text }))
          }
        />
        <PrimaryInput
          label="Email"
          onChangeText={(email) => setUserData((prev) => ({ ...prev, email }))}
        />
        <PrimaryInput
          label="Hasło"
          secureTextEntry={true}
          onChangeText={(password) =>
            setUserData((prev) => ({ ...prev, password }))
          }
        />
        <PrimaryInput
          label="Powtórz hasło"
          secureTextEntry={true}
          onChangeText={(text) => setConfPassword(text)}
        />
      </ScrollView>
      <View>
        <SecondaryButton
          text="Mam już konto"
          onPress={() => setAuthFormIndex(1)}
        />
        <View style={styles.submitButton}>
          <PrimaryButton text="Zarejestruj" onPress={handleSubmit} />
        </View>
      </View>
      <Modal visible={modal} animationType="slide">
        <Text>Na podany email wysłaliśmy kod weryfikacyjny.</Text>
        <TextInput
          placeholder="Kod"
          onChangeText={(text) => setVerificationCode(text)}
        />
        <Pressable onPress={handleCodeSubmit} style={styles.modalButton}>
          <Text style={styles.modalText}>Wyślij</Text>
        </Pressable>
      </Modal>
    </View>
  );
}
