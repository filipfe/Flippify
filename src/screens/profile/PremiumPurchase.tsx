import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {
  BackIcon,
  DefaultProfileIcon,
  PremiumIcon,
} from "../../assets/icons/icons";
import Benefits from "../../components/premium/Benefits";
import Summary from "../../components/premium/Summary";

export default function PremiumPurchase({ onClose }: { onClose: () => void }) {
  const { user } = useContext(AuthContext);
  const { username, avatar_url } = user;
  return (
    <LinearGradient
      style={styles.gradient}
      colors={linearGradient}
      start={{ x: 0, y: 0 }}
    >
      <TouchableWithoutFeedback
        style={{
          height: 24,
          width: 24,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
        }}
        onPress={onClose}
      >
        <BackIcon height={16} width={16} fill={"#FFF"} />
      </TouchableWithoutFeedback>
      <View style={styles.topWrapper}>
        <View style={{ position: "relative" }}>
          <View style={styles.pictureWrapper}>
            {avatar_url ? (
              <Image style={styles.picture} source={{ uri: avatar_url }} />
            ) : (
              <DefaultProfileIcon
                width={112}
                height={112}
                style={styles.picture}
              />
            )}
          </View>
          <View style={styles.crown}>
            <PremiumIcon width={24} />
          </View>
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Benefits />
      <Summary />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: "space-between",
  },
  topWrapper: {
    alignItems: "center",
  },
  pictureWrapper: {
    height: 112,
    width: 112,
    borderRadius: 112,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    overflow: "hidden",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  picture: {
    width: 112,
    height: 112,
  },
  crown: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderRadius: 44,
    backgroundColor: "#F2F8FD",
    borderColor: "#FFF",
    position: "absolute",
    left: -8,
    top: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 24,
    fontFamily: "Bold",
    color: "#FFF",
  },
});
