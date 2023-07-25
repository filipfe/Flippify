import { useContext, useState } from "react";
import { LoginData } from "../../const/auth";
import { View, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import Loader from "../Loader";

export default function CodePopup({ email }: Pick<LoginData, "email">) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { verifyOTP } = useContext(AuthContext);
  const { background, font } = useContext(ThemeContext);

  function handleSubmit() {
    setIsLoading(true);
    verifyOTP({ email, token: code, type: "email" });
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.innerWrapper, { backgroundColor: background }]}>
        <Text style={[styles.title, { color: font }]}>
          Wpisz kod jednorazowy
        </Text>
        <View style={{ alignSelf: "stretch", marginVertical: 24 }}>
          <PrimaryInput onChangeText={(text) => setCode(text)} />
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <PrimaryButton onPress={handleSubmit} width="100%" text="Zatwierdź" />
        )}
      </View>
      <View style={styles.backdrop} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    opacity: 0.8,
    position: "absolute",
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  innerWrapper: {
    borderRadius: 24,
    padding: 24,
    width: "80%",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "SemiBold",
  },
});
