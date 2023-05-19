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
import Loader from "../Loader";
import { API_URL } from "@env";
import { useTailwind } from "tailwind-rn/dist";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import { AuthFormContext } from "../../providers/AuthFormProvider";
import SecondaryButton from "../SecondaryButton";

export default function Register() {
  const tw = useTailwind();
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
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => setAuthFormIndex(1))
      .catch((err) => alert(err));
  };

  if (status === "Registered") return <Text>Zarejestrowano</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text style={{ fontFamily: "Bold", ...tw("text-center text-2xl mb-8") }}>
        Załóż <Text style={tw("text-primary")}>bezpłatne</Text> konto
      </Text>
      <ScrollView style={tw("flex-1")}>
        <PrimaryInput
          field="username"
          label="Nazwa użytkownika"
          setState={setUserData}
        />
        <PrimaryInput field="email" label="Email" setState={setUserData} />
        <PrimaryInput
          field="password"
          label="Hasło"
          secured={true}
          setState={setUserData}
        />
        <PrimaryInput
          field="confPassword"
          label="Powtórz hasło"
          secured={true}
          setState={setConfPassword}
        />
      </ScrollView>
      <View>
        <SecondaryButton
          text="Mam już konto"
          onPress={() => setAuthFormIndex(1)}
        />
        <View style={{ marginTop: 20 }}>
          <PrimaryButton text="Zarejestruj" onPress={handleSubmit} />
        </View>
      </View>
      <Modal visible={modal} animationType="slide">
        <Text>Na podany email wysłaliśmy kod weryfikacyjny.</Text>
        <TextInput
          placeholder="Kod"
          onChangeText={(text) => setVerificationCode(text)}
        />
        <Pressable
          onPress={handleCodeSubmit}
          style={tw("bg-blue-400 py-3 px-6")}
        >
          <Text style={tw("text-white font-medium")}>Wyślij</Text>
        </Pressable>
      </Modal>
    </View>
  );
}
