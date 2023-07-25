import { useContext, useState } from "react";
import { LoginData } from "../../const/auth";
import { View, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import Loader from "../Loader";
import NumberInput from "./NumberInput";
import { FlatList } from "react-native-gesture-handler";

export default function CodePopup({ email }: Pick<LoginData, "email">) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { verifyOTP } = useContext(AuthContext);
  const { background, font } = useContext(ThemeContext);

  async function handleSubmit(code: string) {
    setIsLoading(true);
    const { error } = await verifyOTP({ email, token: code, type: "email" });
    setIsLoading(false);
    error && alert(error);
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.innerWrapper, { backgroundColor: background }]}>
        <Text style={[styles.title, { color: font }]}>
          Wpisz kod jednorazowy
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            style={{ alignSelf: "stretch", marginBottom: 24 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={6}
            scrollEnabled={false}
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <NumberInput
                index={item}
                code={code}
                onDelete={() =>
                  setCode((prev) => prev.slice(0, prev.length - 1))
                }
                onType={(letter) => {
                  setCode((prev) => prev + letter);
                  code.length === 5 && handleSubmit(code + letter);
                }}
              />
            )}
            keyExtractor={(item) => item.toString()}
          />
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
    marginBottom: 24,
  },
});
