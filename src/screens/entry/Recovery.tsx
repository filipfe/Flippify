import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryInput from "../../components/PrimaryInput";
import Loader from "../../components/Loader";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { supabase } from "../../hooks/useAuth";

const { width } = Dimensions.get("screen");

type Props = {
  close: () => void;
};

export default function Recovery({ close }: Props) {
  const { font } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function resetPassword() {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://flippify.com/change-password",
    });
    error ? alert(error.message) : "";
    setIsLoading(false);
  }

  if (isLoading)
    return (
      <View style={{ width }}>
        <Loader />
      </View>
    );

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.title, color: font }}>Odzyskaj hasło</Text>
      <View style={{ flex: 1 }}>
        <PrimaryInput onChangeText={(text) => setEmail(text)} label="Email" />
      </View>
      <View>
        <SecondaryButton text="Pamiętam hasło" onPress={close} />
        <View style={styles.submitButton}>
          <PrimaryButton text="Zatwierdź" onPress={resetPassword} />
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
});
