import { View, Modal, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryInput from "./PrimaryInput";
import PrimaryButton from "./PrimaryButton";
import { Text } from "react-native";
import Loader from "./Loader";

export default function Introduction() {
  const [isLoading, setIsLoading] = useState(false);
  const [usernamePopup, setUsernamePopup] = useState(false);
  const [username, setUsername] = useState("");
  const { user, isLogged, isProfileLoading, updateUser } =
    useContext(AuthContext);
  const { background, font, secondary } = useContext(ThemeContext);

  async function updateUsername() {
    setIsLoading(true);
    if (username.length < 3 || username.length > 15)
      return alert("Wrong length");
    const error = await updateUser("username", username);
    error && alert(error.message);
    setIsLoading(false);
  }

  useEffect(() => {
    if (user.username || !isLogged || isProfileLoading)
      usernamePopup && setUsernamePopup(false);
    else setUsernamePopup(true);
  }, [user.username, isLogged, isProfileLoading]);

  return (
    <Modal
      visible={usernamePopup}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.wrapper}>
        <View style={[styles.innerWrapper, { backgroundColor: background }]}>
          <View>
            <Text style={[styles.title, { color: font }]}>
              Dodaj nazwę użytkownika
            </Text>
            <Text style={[styles.desc, { color: secondary }]}>
              Pomoże ona w rozpoznaniu Cię przez innych użytkowników przy
              publikowaniu nowych treści
            </Text>
            <View style={{ alignSelf: "stretch" }}>
              <PrimaryInput
                onChangeText={(text) => setUsername(text)}
                label="Nazwa użytkownika"
              />
            </View>
          </View>
          {isLoading ? (
            <Loader />
          ) : (
            <PrimaryButton onPress={updateUsername} text="Zapisz" />
          )}
        </View>
        <View style={styles.backdrop} />
      </View>
    </Modal>
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
    backgroundColor: "#000",
    opacity: 0.8,
    zIndex: -10,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  innerWrapper: {
    borderRadius: 24,
    width: "90%",
    height: "60%",
    paddingHorizontal: 24,
    paddingVertical: 36,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  desc: {
    lineHeight: 24,
    fontFamily: "Medium",
    textAlign: "center",
    marginVertical: 24,
  },
});
