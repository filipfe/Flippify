import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
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
import { AuthContext } from "../../context/AuthContext";
import SecondaryButton from "../SecondaryButton";

export default function Login() {
  const tw = useTailwind();
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
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <Text
        style={{
          fontFamily: "Bold",
          ...tw("text-center text-font text-2xl mb-8"),
        }}
      >
        Zaloguj się
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <PrimaryInput field="email" setState={setUserData} label="Email" />
        <PrimaryInput
          field="password"
          setState={setUserData}
          label="Hasło"
          secured={true}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity style={{ marginTop: 2, marginLeft: 2 }}>
            <Text style={{ ...tw("text-font"), fontFamily: "Bold" }}>
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
        <View style={{ marginTop: 20 }}>
          <PrimaryButton text="Zaloguj się" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}
